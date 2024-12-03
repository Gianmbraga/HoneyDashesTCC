import { useState, useEffect } from 'react';
import moment from 'moment';
import { FaShieldAlt, FaExclamationTriangle, FaClock, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Adicionando o hook useNavigate para navegação
import './style.css';

const DefaultTitle = ({ title, subtitle, description, attacksActive, responseTime, margin }) => {
    const titleColor = attacksActive > 0 ? '#FF4D4F' : '#52C41A'; // Vermelho para alerta, verde para seguro
    const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        // Configura o intervalo para atualizar o tempo a cada segundo
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"));
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    // Função para voltar à tela anterior
    const handleBackClick = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <div id="dashboard-content-title" style={{ margin: margin ?? "0 0 1.5rem 0" }}>
            <div id="dashboard-content-title-left">
                {/* Botão de voltar */}
                <FaArrowLeft size={20} color="#FFFFFF" onClick={handleBackClick} style={{ cursor: 'pointer', marginRight: '10px' }} />
                
                {/* Divisória */}
                <div className="divider" style={{ height: '30px', width: '1px', backgroundColor: '#FFFFFF', marginRight: '10px' }}></div>

                {/* Escudo */}
                <FaShieldAlt size={30} color={'#fdb700'} style={{ marginRight: '10px' }} />
                
                {/* Título e subtítulo */}
                <span id="dashboard-content-title-title" style={{ color: '#fdb700' }}>
                    {title ?? 'Dashboard de Segurança'}
                    <span id="dashboard-content-title-subtitle">{subtitle ?? ''}</span>
                </span>
            </div>

            <div id="dashboard-content-title-right">
                <div id="dashboard-content-stats">
                    <div id="dashboard-stat-item">
                        <FaExclamationTriangle color="#FF4D4F" />
                        <span style={{color: "white"}}>{attacksActive ?? 0} Ataques Ativos</span>
                    </div>
                    <div id="dashboard-stat-item">
                        <FaClock color="#1890FF" />
                        <span style={{color: "white"}}>Tempo de Resposta: {responseTime ?? 'N/A'}</span>
                    </div>
                </div>
                <div id="dashboard-time">
                    <i className='fa fa-calendar'></i>
                    <span style={{color: "white"}}>{currentTime}</span> {/* Exibe o tempo atualizado */}
                </div>
            </div>
        </div>
    );
}

export default DefaultTitle;
