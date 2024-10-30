import React from "react";
import { useState, useEffect } from "react";
import './style.css'
import { useHistory } from 'react-router-dom';
import { BlockUI } from "primereact/blockui";
import DefaultDiv from "../../components/DefaultComponents/DefaultDiv";
import DefaultDivider from "../../components/DefaultComponents/DefaultDivider";
import DefaultColumn from "../../components/DefaultComponents/DefaultColumn";
import DefaultRow from "../../components/DefaultComponents/DefaultRow";
import DefaultLabel from "../../components/DefaultComponents/DefaultLabel";

import DefaultCard from "../../components/DefaultComponents/DefaultCard";
import DefaultTitle from "../../components/DefaultComponents/DefaultTitle";

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { dashboardMetricasAPI } from "../../services/DashBoardMetricasAPI";



const DashboardElements = () => {

    // useEffect(async () => {

    // }, [])
    const [isLoading, setIsLoading] = useState(undefined)
    const [chartOptionsAtaquesPrincipais, setChartOptionsAtaquesPrincipais] = useState(null);
    const [chartOptionsInfluenciadores, setChartOptionsInfluenciadores] = useState(null);
    const [chartOptionsFooter, setChartOptionsFooter] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Defina o tempo desejado, aqui está 5 segundos para o teste.
        
        //MONTAR GRAFIOS
        mountGraphBarAtaques([
            "DDoS",
            "Phishing",
            "Malware",
            "Ransomware",
            "Brute Force",
            "SQL Injection",
            "Cross-Site Scripting (XSS)",
            "Zero-Day Exploit",
            "Man-in-the-Middle (MitM)",
            "Credential Stuffing"
          ],
          [
            1200, 800, 600, 350, 200, 150, 130, 100, 90, 60
          ]
        )

        mountGraphPieFactors([
            {
                name: 'Endereço IP',
                y: 30.25,
                sliced: true,
                selected: true
            },
            {
                name: 'Geolocalização',
                y: 20.15
            },
            {
                name: 'Assinatura de Malware',
                y: 15.10
            },
            {
                name: 'Comportamento do Usuário',
                y: 10.75
            },
            {
                name: 'Logs de Sistema',
                y: 8.65
            },
            {
                name: 'Tipo de Tráfego',
                y: 5.50
            },
            {
                name: 'DNS Queries',
                y: 3.95
            },
            {
                name: 'Tempo de Conexão',
                y: 2.80
            },
            {
                name: 'Portas de Rede',
                y: 1.90
            },
            {
                name: 'Protocolo Utilizado',
                y: 0.95
            }
        ]
        )

        mountGraphFooter([
            27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
            60.0, 28.6, 32.1
        ])

        return () => clearTimeout(timer); // Limpa o timeout quando o componente desmontar, para evitar problemas.
    }, [])


    const fillGruposAcesso = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAll();
        console.log(response)
            // if(response.success && response.data){
            //     setGruposAcesso(response.data);
            // }

        setIsLoading(false);

    }

    const mountGraphBarAtaques = (labels, data) => {
        var optionsTopOportunidades = {
            chart: {
                type: 'bar',
                height: 350,
            },
            title: {
                text: 'Ataques',
                align: 'center'
            },
            subtitle: {
                text: 'TOP 10 Ataques',
                align: 'center'
            },
            xAxis: {
                categories: labels,
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total em valor',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            legend: {
                enabled: false // Aqui desativa completamente a legenda
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Valor',
                data: data
            }]
        };


        setChartOptionsAtaquesPrincipais(JSON.parse(JSON.stringify(optionsTopOportunidades)))
    }

    const mountGraphPieFactors = (data) => {
        
        var optionsPieChart = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 350,
            },
            title: {
                text: 'Maiores Fatores',
                align: 'center'
            },
            subtitle: {
                text: 'TOP 10 Fatores',
                align: 'center'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        };

        setChartOptionsInfluenciadores(JSON.parse(JSON.stringify(optionsPieChart)))
    }

    const mountGraphFooter = (data) => {
        var optionsGraphFooter = {
            chart: {
                zooming: {
                    type: 'xy'
                },
                height: 150,
            },
            title: {
                text: 'Picos de ataque',
                align: 'left'
            },
            xAxis: [{
                categories: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Quantidade',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }],
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 60,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Quantidade',
                type: 'column',
                data: data,        
            }, {
                name: 'Picos',
                type: 'spline',
                data: data,
            }]
        };
    
        setChartOptionsFooter(JSON.parse(JSON.stringify(optionsGraphFooter)));
    };
    

    return (
        <BlockUI blocked={isLoading} fullScreen template={<i className="pi pi-clock" style={{ fontSize: '3rem' }}></i>}>
            <DefaultTitle title={"Ataques"}  subtitle={"Aqui você encontra os ataque realizados"} description={"aqui veremos os ataques"}/>


            <DefaultDiv padding={"0 15px"}>
                <DefaultRow>
                    <DefaultDiv height={"100%"}>

                        <DefaultCard>
                            <DefaultRow>
                                
                                <DefaultDiv width={"30%"}>
                                    

                                    <DefaultColumn alignItems={"center"} justifyContent={"center"}>
                                        <DefaultLabel fontWeight={"bold"} fontSize={"20px"} title={"Destaques"} />
                                    </DefaultColumn>

                                    <DefaultColumn justifyContent={"space-between"} style={{ height: '85%' }}>
                                        {/* Informações importantes */}
                                        <DefaultRow>
                                            <i className="pi pi-bolt" style={{ fontSize: '24px', color: '#FF5733' }}></i>
                                            <DefaultLabel title={"Total de ataques: 3,500"} fontSize={"16px"} fontWeight={"bold"} />
                                        </DefaultRow>
                                        
                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#3498DB' }}></i>
                                            <DefaultLabel title={"Ataque mais comum: DDoS (1,200 vezes)"} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-globe" style={{ fontSize: '24px', color: '#2ECC71' }}></i>
                                            <DefaultLabel title={"Região mais afetada: América do Norte"} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-stopwatch" style={{ fontSize: '24px', color: '#F1C40F' }}></i>
                                            <DefaultLabel title={"Tempo médio de resposta: 5 minutos"} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-shield" style={{ fontSize: '24px', color: '#E74C3C' }}></i>
                                            <DefaultLabel title={"Ataques bloqueados: 85%"} fontSize={"16px"} />
                                        </DefaultRow>
                                    </DefaultColumn>




                                </DefaultDiv>

                                <DefaultDivider orientation={"vertical"} title={""} />

                                <DefaultDiv width={"70%"}>
                                    <HighchartsReact highcharts={Highcharts} options={chartOptionsAtaquesPrincipais} />

                                </DefaultDiv>
                                
                            </DefaultRow>

                        </DefaultCard>

                    </DefaultDiv>
                        
                        <DefaultDivider orientation={"vertical"} title={""} />

                    <DefaultCard>
                        <HighchartsReact highcharts={Highcharts} options={chartOptionsInfluenciadores} />
                    </DefaultCard>
                </DefaultRow>

                <DefaultDivider isFullLine />

                <DefaultDiv>
                    <DefaultCard>
                        <HighchartsReact highcharts={Highcharts} options={chartOptionsFooter} />
                        
                    </DefaultCard>
                </DefaultDiv>
                
            </DefaultDiv>
        </BlockUI>
    )
}

export default DashboardElements;
