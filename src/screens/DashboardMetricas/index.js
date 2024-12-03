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



const DashboardMetricas = () => {

    const [isLoading, setIsLoading] = useState(undefined)
    const [chartOptionsAtaquesPrincipais, setChartOptionsAtaquesPrincipais] = useState(null);
    const [chartOptionsInfluenciadores, setChartOptionsInfluenciadores] = useState(null);
    const [chartOptionsFooter, setChartOptionsFooter] = useState(null);

    //variables for graphs

    const [totalAtaques, setTotalAtaques] = useState("")
    const [totalNaoAtaques, setTotalNaoAtaques] = useState("")
    const [acuracia, setAcuracia] = useState("")
    const [mediaPrecisao, setMediaPrecisao] = useState("")


    const [valorBinario0, setValorBinario0] = useState("")
    const [valorRecallBinario0, setValorRecallBinario0] = useState("")
    const [f1ScoreBinario0, setF1ScoreBinario0] = useState("")


    const [valorBinario1, setValorBinario1] = useState("")
    const [valorRecallBinario1, setValorRecallBinario1] = useState("")
    const [f1ScoreBinario1, setF1ScoreBinario1] = useState("")
    
    const [distribuicao, setDistribuicao] = useState([])
    const [precisaoValue, setPrecisaoValue] = useState("")

    useEffect(() => {
        setIsLoading(true);

        getMetricas();
        getMetricasNaoAtaques();
        getAccuracy();
        getPrecisionAverage();
        getBinaryType0();
        getBinaryType1();

        getMetricaEspecificas();
        
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

        
    }, [])


    const getMetricas = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAllAttacks('RandomForest');

        if(response.success && response.data){
            setTotalAtaques(response.data);
        }

        setIsLoading(false);

    }

    const getMetricasNaoAtaques = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAllNotAttacks('RandomForest');

        if(response.success && response.data){
            setTotalNaoAtaques(response.data);
        }

        setIsLoading(false);

    }

    const getAccuracy = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAccuracy('RandomForest');

        if(response.success && response.data){
            setAcuracia(response.data);
        }

        setIsLoading(false);

    }

    const getPrecisionAverage = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getPrecisionAverage('RandomForest');
        if(response.success && response.data){
            setMediaPrecisao(response.data);
        }

        setIsLoading(false);

    }

    const getBinaryType0 = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getBinaryMetrics('RandomForest', 0);
        if(response.success && response.data){
            setValorBinario0(response.data.binary.RandomForest.normal.class_report[0].precision);
            setValorRecallBinario0(response.data.binary.RandomForest.normal.class_report[0].recall)
            setF1ScoreBinario0(response.data.binary.RandomForest.normal.class_report[0]["f1-score"]);
        }

        setIsLoading(false);

    }

    const getBinaryType1 = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getBinaryMetrics('RandomForest', 1);

        if(response.success && response.data){
            setValorBinario1(response.data.binary.RandomForest.normal.class_report[1].precision);
            setValorRecallBinario1(response.data.binary.RandomForest.normal.class_report[1].recall)
            setF1ScoreBinario1(response.data.binary.RandomForest.normal.class_report[1]["f1-score"]);
        }

        setIsLoading(false);

    }

    const getMetricaEspecificas = async () => {
        setIsLoading(true);
    
        try {
            const response = await dashboardMetricasAPI.getMetricaEspecificas('RandomForest', "Normal");
            const responsePca = await dashboardMetricasAPI.getPcaMetrics('RandomForest', "Normal");
    
            if (response.success && response.data && responsePca.success && responsePca.data) {
                // Aguarde explicitamente para evitar inconsistências
                const normalReport = response.data.class?.RandomForest?.normal?.class_report?.Normal;
                const pcaReport = responsePca.data.class?.RandomForest?.pca?.class_report?.Normal;
    
                if (normalReport && pcaReport) {
                    const normalPrecision = normalReport.precision;
                    const pcaPrecision = pcaReport.precision;
    
                    mountGraphFooter([normalPrecision, pcaPrecision]);
                } else {
                    console.error("Relatórios Normal ou PCA ausentes");
                }
            } else {
                console.error("Respostas malformadas ou ausentes");
            }
        } catch (error) {
            console.error("Erro ao obter métricas:", error);
        }
    
        setIsLoading(false);
    };
    


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
                text: 'Uso de PCA',
                align: 'left'
            },
            xAxis: [{
                categories: [
                    'Sem PCA', 'com PCA'
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
            <DefaultTitle title={"Random Forest"}  subtitle={"Aqui você encontra os ataque realizados"} description={"aqui veremos os ataques"}/>


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
                                            <DefaultLabel title={"Total de ataques:" + totalAtaques} fontSize={"16px"} fontWeight={"bold"} />
                                        </DefaultRow>
                                        
                                        <DefaultRow>
                                            <i className="pi pi-bolt" style={{ fontSize: '24px', color: '#FF5733' }}></i>
                                            <DefaultLabel title={"Total de não ataques:" + totalNaoAtaques} fontSize={"16px"} fontWeight={"bold"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#3498DB', marginRight: '3px' }}></i>
                                            <DefaultLabel title={"Acurácia: " + acuracia} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#F1C40F' }}></i>
                                            <DefaultLabel title={"Media de Precisão:" + mediaPrecisao} fontSize={"16px"} />
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
                                            <DefaultLabel title={"Total de ataques:" + totalAtaques} fontSize={"16px"} fontWeight={"bold"} />
                                        </DefaultRow>
                                        
                                        <DefaultRow>
                                            <i className="pi pi-bolt" style={{ fontSize: '24px', color: '#FF5733' }}></i>
                                            <DefaultLabel title={"Total de não ataques:" + totalNaoAtaques} fontSize={"16px"} fontWeight={"bold"} />
                                        </DefaultRow>

                                        {/* <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#3498DB', marginRight: '3px' }}></i>
                                            <DefaultLabel title={"Acurácia: " + acuracia} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#F1C40F' }}></i>
                                            <DefaultLabel title={"Media de Precisão:" + mediaPrecisao} fontSize={"16px"} />
                                        </DefaultRow> */}

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#E74C3C' }}></i>
                                            <DefaultLabel title={"Precisão valor binário 0:" + valorBinario0} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#E74C3C' }}></i>
                                            <DefaultLabel title={"Precisão valor binário 1:" + valorBinario1} fontSize={"16px"} />
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

export default DashboardMetricas;