import React from "react";
import { useState, useEffect } from "react";
import './style.css'
import { useNavigate } from 'react-router-dom';
import { BlockUI } from "primereact/blockui";
import DefaultDiv from "../../components/DefaultComponents/DefaultDiv";
import DefaultColumn from "../../components/DefaultComponents/DefaultColumn";
import DefaultRow from "../../components/DefaultComponents/DefaultRow";
import Logo from "../../assets/LogoHoney.png"
import LogoSvg from "../../assets/Honeysvg.svg"
import DefaultLabel from "../../components/DefaultComponents/DefaultLabel";
import DefaultDropdown from "../../components/DefaultComponents/DefaultDropdown"
import DefaultButton from "../../components/DefaultComponents/DefaultButton"
import DefaultCard from "../../components/DefaultComponents/DefaultCard";
import DefaultDivider from "../../components/DefaultComponents/DefaultDivider";


const Menu = () => {

    // useEffect(async () => {

    // }, [])

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(undefined)
    const [currentScreen, setCurrentScreen] = useState(undefined)


    const redirectScreen = () => {
        console.log("funcionou: ", currentScreen)

        if(currentScreen.id === 1){
            navigate("/DashboardMetricas")
        }

        if(currentScreen.id === 2){
            navigate("/DashboardElements")
        }
    }

    return (
        <BlockUI blocked={isLoading} fullScreen template={<i className="pi pi-clock" style={{ fontSize: '3rem' }}></i>}>
            <DefaultDiv height={"100%"}>
                <DefaultRow style={{ height: "100%" }}>
                    <DefaultDiv id="div-left-side" width={"30%"} padding="0 50px">
                        <DefaultColumn justifyContent={"center"} alignItems={"center"} style={{ height: "100%" }}>
                            <DefaultColumn justifyContent={"center"} alignItems={"center"}>
                                <DefaultCard>
                                    <DefaultRow justifyContent={"center"}>
                                        <img src={LogoSvg} height={"100px"} width={"100px"} />
                                    </DefaultRow>
                                    

                                    <DefaultDiv>
                                        <DefaultRow justifyContent={"center"}>
                                            <DefaultLabel fontWeight={"bold"} title={"Escolha o seu Dashboard a ser acessado!"} />
                                        </DefaultRow>
                                    </DefaultDiv>
                                    
                                    <DefaultColumn margin={"15px 0 0 0"}>
                                        <DefaultDropdown  height={"45px"}
                                            options={[
                                                { id: 1, nome: "Screen 1" },
                                                { id: 2, nome: "Screen 2" },
                                                { id: 3, nome: "Screen 3" },
                                                { id: 4, nome: "Screen 4" },
                                                { id: 5, nome: "Screen 5" }
                                            ]} 
                                            showClear optionsLabel={"nome"} valueState={currentScreen} setValueState={(e) => setCurrentScreen(e.target.value)}
                                        />
                                        {currentScreen ?
                                            <>  
                                                <DefaultRow margin={"15px 0 0 0"} justifyContent={"center"}>
                                                    <DefaultDiv width={"50%"}>
                                                        <DefaultButton title={"Acessar"} onClick={() => redirectScreen()}/>
                                                    </DefaultDiv>
                                                </DefaultRow>
                                            </>
                                    
                                            :
                                            <>
                                            </>

                                        }
                                        
                                    </DefaultColumn>
                                    
                                    
                                    
                                </DefaultCard>
                            </DefaultColumn>
                        </DefaultColumn>
                    </DefaultDiv>
    
                    {/* Div da direita com animação */}
                    <DefaultDiv id={"div-right-side"} width={"70%"}>
                        
    
                        {/* Animação de boas-vindas */}
                        <div className="welcome-message">
                            <h1>Honey Dashes</h1>
                            <p>Seus dados estão prontos para serem analisados.</p>
                        </div>

                        <DefaultColumn justifyContent={"center"} alignItems={"center"}>
                            <img src={Logo} height={"400px"} width={"400px"} />
                        </DefaultColumn>
                        
                        {/* Barras de gráfico animadas */}
                        <div className="graph-bars">
                            <div className="bar bar1"></div>
                            <div className="bar bar2"></div>
                            <div className="bar bar3"></div>
                            <div className="bar bar4"></div>
                        </div>
                    </DefaultDiv>
                </DefaultRow>
            </DefaultDiv>
        </BlockUI>
    )
    
}

export default Menu;
