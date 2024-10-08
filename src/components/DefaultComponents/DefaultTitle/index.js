import { useState, useEffect } from 'react';
import moment from 'moment';
import { FaShieldAlt, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import './style.css';


const DefaultTitle = ({ title, subtitle, description, attacksActive, responseTime, margin }) => {
    const titleColor = attacksActive > 0 ? '#FF4D4F' : '#52C41A'; // Vermelho para alerta, verde para seguro
    const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));

    useEffect(() => {
        // Configura o intervalo para atualizar o tempo a cada segundo
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"));
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div id="dashboard-content-title" style={{ margin: margin ?? "0 0 1.5rem 0" }}>
            <div id="dashboard-content-title-left">
                <FaShieldAlt size={30} color={titleColor} style={{ marginRight: '10px' }} />
                <span id="dashboard-content-title-title" style={{ color: titleColor }}>{title ?? 'Dashboard de Segurança'}
                    <span id="dashboard-content-title-subtitle">{subtitle ?? ''}</span>
                </span>
            </div>
            <div id="dashboard-content-title-right">
                <div id="dashboard-content-stats">
                    <div id="dashboard-stat-item">
                        <FaExclamationTriangle color="#FF4D4F" />
                        <span>{attacksActive ?? 0} Ataques Ativos</span>
                    </div>
                    <div id="dashboard-stat-item">
                        <FaClock color="#1890FF" />
                        <span>Tempo de Resposta: {responseTime ?? 'N/A'}</span>
                    </div>
                </div>
                <div id="dashboard-time">
                    <i className='fa fa-calendar'></i>
                    <span>{currentTime}</span> {/* Exibe o tempo atualizado */}
                </div>
            </div>
        </div>
    );
}

export default DefaultTitle;
