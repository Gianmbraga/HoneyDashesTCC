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



const DashboardKNN = () => {

    const [isLoading, setIsLoading] = useState(undefined)
    const [chartOptionsAtaquesPrincipais, setChartOptionsAtaquesPrincipais] = useState(null);
    const [chartOptionsAtaquesBinario, setChartOptionsAtaquesBinario] = useState(null);
    const [chartOptionsInfluenciadores, setChartOptionsInfluenciadores] = useState(null);
    const [chartOptionsFooter, setChartOptionsFooter] = useState(null);

    const [chartMetricsFooter, setChartMetricsFooter] = useState(null)

    //variables for graphs

    const [totalAtaques, setTotalAtaques] = useState("")
    const [totalNaoAtaques, setTotalNaoAtaques] = useState("")
    const [acuracia, setAcuracia] = useState("")
    const [mediaPrecisao, setMediaPrecisao] = useState("")

    const [labelGraphNormal, setLabelGraphNormal] = useState([])
    const [valueGraphNormal, setValueGraphNormal] = useState([])


    const [labelAccuracyNormal, setLabelAccuracyNormal] = useState("")
    const [labelPrecisionNormal, setLabelPrecisionNormal] = useState("")

    const [labelAccuracyBinario, setLabelAccuracyBinario] = useState("")
    const [labelPrecisionBinario, setLabelPrecisionBinario] = useState("")

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
        

        getTopFeaturesNormal()
        getTopFeaturesBinario();


        getAccuracyNormal();
        getPrecisaoNormal();

        getAccuracyBinario();
        getPrecisaoBinario();
        getAllMetricas();


        mountGraphMetrics()

        //MONTAR GRAFIOS
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


    const getAllMetricas = async () => {
        setIsLoading(true);
    
        try {
            // Faz a requisição à API para obter as métricas
            const response = await dashboardMetricasAPI.getAllMetricas('SVM');
            console.log("MÉTRICAS: ", response);
    
            if (response.success && response.data) {
                // Filtra os dados para remover campos indesejados
                const filteredMetrics = Object.entries(response.data).filter(
                    ([key]) => key !== 'Normal' && key !== 'weighted avg' && key !== 'macro avg'
                );
    
                // Ordena os dados filtrados em ordem decrescente pelos valores
                const sortedMetrics = filteredMetrics.sort(([, valueA], [, valueB]) => valueB - valueA);
    
                // Gera listas separadas de labels (nomes das categorias) e valores
                const labels = sortedMetrics.map(([key]) => key); // Extrai os nomes das categorias
                const values = sortedMetrics.map(([, value]) => value); // Extrai os valores correspondentes
    
                // Monta o gráfico com as listas geradas
                mountGraphMetrics(labels, values);
            }
        } catch (error) {
            console.error("Erro ao obter métricas:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    const getMetricas = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAllAttacks('KNN');

        if(response.success && response.data){
            setTotalAtaques(response.data);
        }

        setIsLoading(false);

    }

    const getMetricasNaoAtaques = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAllNotAttacks('KNN');

        if(response.success && response.data){
            setTotalNaoAtaques(response.data);
        }

        setIsLoading(false);

    }

    const getAccuracyNormal = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAccuracyNormal('KNN');

        if(response.success && response.data){
            setLabelAccuracyNormal(response.data);
        }

        setIsLoading(false);

    }

    const getPrecisaoNormal = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getPrecisaoNormal('KNN');

        if(response.success && response.data){
            setLabelPrecisionNormal(response.data);
        }

        setIsLoading(false);

    }
    
    const getAccuracyBinario = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAccuracyBinario('KNN');

        if(response.success && response.data){
            setLabelAccuracyBinario(response.data);
        }

        setIsLoading(false);

    }

    const getPrecisaoBinario = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getPrecisaoBinario('KNN');
        console.log("testeMetrica: ", response)

        if(response.success && response.data){
            setLabelPrecisionBinario(response.data);
        }

        setIsLoading(false);

    }

    const getAccuracy = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getAccuracy('KNN');

        if(response.success && response.data){
            setAcuracia(response.data);
        }

        setIsLoading(false);

    }

    const getPrecisionAverage = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getPrecisionAverage('KNN');
        if(response.success && response.data){
            setMediaPrecisao(response.data);
        }

        setIsLoading(false);

    }

    const getBinaryType0 = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getBinaryMetrics('KNN', 0);
        if(response.success && response.data){
            setValorBinario0(response.data.binary.KNN.normal.class_report[0].precision);
            setValorRecallBinario0(response.data.binary.KNN.normal.class_report[0].recall)
            setF1ScoreBinario0(response.data.binary.KNN.normal.class_report[0]["f1-score"]);
        }

        setIsLoading(false);

    }

    const getBinaryType1 = async() => {

        setIsLoading(true);

        var response = await dashboardMetricasAPI.getBinaryMetrics('KNN', 1);

        if(response.success && response.data){
            setValorBinario1(response.data.binary.KNN.normal.class_report[1].precision);
            setValorRecallBinario1(response.data.binary.KNN.normal.class_report[1].recall)
            setF1ScoreBinario1(response.data.binary.KNN.normal.class_report[1]["f1-score"]);
        }

        setIsLoading(false);

    }

    const getMetricaEspecificas = async () => {
        setIsLoading(true);
    
        try {
            const response = await dashboardMetricasAPI.getMetricaEspecificas('KNN', "Normal");
            const responsePca = await dashboardMetricasAPI.getPcaMetrics('KNN', "Normal");
    
            if (response.success && response.data && responsePca.success && responsePca.data) {
                // Aguarde explicitamente para evitar inconsistências
                const normalReport = response.data.class?.KNN?.normal?.class_report?.Normal;
                const pcaReport = responsePca.data.class?.KNN?.pca?.class_report?.Normal;
    
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
    
    const getTopFeaturesNormal = async () => {
        setIsLoading(true);
    
        try {
            const response = await dashboardMetricasAPI.getTopFeaturesNormal('KNN');
    
            if (response.success && response.data) {
                const topFeatures = response.data.class.KNN.normal.top_features;
    
                // Converte o objeto de `top_features` para uma lista, ordena e pega os top 10
                const sortedFeatures = Object.entries(topFeatures)
                    .sort(([, valueA], [, valueB]) => valueB - valueA) // Ordena por valor decrescente
                    .slice(0, 10); // Seleciona os 10 primeiros
    
                // Cria as listas de labels e valores
                const labels = sortedFeatures.map(([key]) => key);
                const values = sortedFeatures.map(([, value]) => value);
    
                // Monta o gráfico com as listas criadas
                mountGraphBarAtaques(labels, values);
            }
        } catch (error) {
            console.error("Erro ao obter top features:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTopFeaturesBinario = async () => {
        setIsLoading(true);
    
        try {
            const response = await dashboardMetricasAPI.getTopFeaturesBinario('KNN');
            console.log("features: ", response);
    
            if (response.success && response.data) {
                const topFeatures = response.data.binary.KNN.normal.top_features;
    
                // Converte o objeto de `top_features` para uma lista, ordena e pega os top 10
                const sortedFeatures = Object.entries(topFeatures)
                    .sort(([, valueA], [, valueB]) => valueB - valueA) // Ordena por valor decrescente
                    .slice(0, 10); // Seleciona os 10 primeiros
    
                // Cria as listas de labels e valores
                const labels = sortedFeatures.map(([key]) => key);
                const values = sortedFeatures.map(([, value]) => value);
    
                // Monta o gráfico com as listas criadas
                mountGraphBarBinario(labels, values);
            }
        } catch (error) {
            console.error("Erro ao obter top features:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    


    const mountGraphBarAtaques = (labels, data) => {
        var optionsTopOportunidades = {
            chart: {
                type: 'bar',
                height: 350,
            },
            title: {
                text: 'Top Features',
                align: 'center'
            },
            subtitle: {
                text: 'TOP 10 Features',
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
                    text: 'Maior influência',
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
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Valor',
                data: data.map((value, index) => ({
                    y: value,
                    color:  '#fdb700'
                }))
            }]
        };
    
        setChartOptionsAtaquesPrincipais(JSON.parse(JSON.stringify(optionsTopOportunidades)));
    }
    

    const mountGraphBarBinario = (labels, data) => {
        var optionsTopOportunidades = {
            chart: {
                type: 'bar',
                height: 350,
            },
            title: {
                text: 'Top Features',
                align: 'center'
            },
            subtitle: {
                text: 'TOP 10 Features',
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
                    text: 'Maior influência',
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
                data: data,
                color: "#fdb700"
            }]
        };


        setChartOptionsAtaquesBinario(JSON.parse(JSON.stringify(optionsTopOportunidades)))
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
                name: 'Acurácia "Normal"',
                type: 'column',
                data: data,
                color: "#fdb700"      
            }, {
                name: 'Valor Max',
                type: 'spline',
                data: data,
            }]
        };
    
        setChartOptionsFooter(JSON.parse(JSON.stringify(optionsGraphFooter)));
    };

    const mountGraphMetrics = (labels, data) => {
        var optionsGraphFooter = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tipos de ataque',
                align: 'left'
            },
            xAxis: {
                categories: labels,
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantidade'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: 'Ataques',
                    data: data,
                    color: "#fdb700" 
                }
            ]
        };
    
        setChartMetricsFooter(JSON.parse(JSON.stringify(optionsGraphFooter)));
    };
    

    return (
        <BlockUI blocked={isLoading} fullScreen template={<i className="pi pi-clock" style={{ fontSize: '3rem' }}></i>}>
            <DefaultTitle title={"KNN"}  subtitle={"Aqui você encontra os ataque realizados"} description={"aqui veremos os ataques"}/>


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
                                            <DefaultLabel title={"Acurácia: " + labelAccuracyNormal} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#F1C40F' }}></i>
                                            <DefaultLabel title={"Media de Precisão:" + labelPrecisionNormal} fontSize={"16px"} />
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
                                            <DefaultLabel title={"Acurácia: " + labelPrecisionBinario} fontSize={"16px"} />
                                        </DefaultRow>

                                        <DefaultRow>
                                            <i className="pi pi-desktop" style={{ fontSize: '24px', color: '#E74C3C' }}></i>
                                            <DefaultLabel title={"Media de Precisão:" + labelAccuracyBinario} fontSize={"16px"} />
                                        </DefaultRow>
                                    </DefaultColumn>




                                </DefaultDiv>

                                <DefaultDivider orientation={"vertical"} title={""} />

                                <DefaultDiv width={"70%"}>
                                    <HighchartsReact highcharts={Highcharts} options={chartOptionsAtaquesBinario} />

                                </DefaultDiv>
                                
                            </DefaultRow>

                        </DefaultCard>

                        </DefaultDiv>

                    
                </DefaultRow>

                <DefaultDivider isFullLine />

                <DefaultRow>
                    <DefaultDiv>
                        <DefaultCard>
                            <HighchartsReact highcharts={Highcharts} options={chartOptionsFooter} />
                            
                        </DefaultCard>
                    </DefaultDiv>
                    
                    <DefaultDivider orientation={"vertical"} title={""} />

                    <DefaultDiv>
                    <DefaultCard>
                        <HighchartsReact highcharts={Highcharts} options={chartMetricsFooter} />
                        
                    </DefaultCard>
                </DefaultDiv>

                </DefaultRow>
                
                
            </DefaultDiv>
        </BlockUI>
    )
}

export default DashboardKNN;
