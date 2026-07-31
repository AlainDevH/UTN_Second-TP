import React from 'react'
import './ContactProfileDrawer.css'

// Algoritmo consistente para generar el color de fondo del avatar según el nombre
const getAvatarColor = (name = '') => {
    const colors = ['#00a884', '#128c7e', '#075e54', '#34b7f1', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

/**
 * Componente ContactProfileDrawer
 * Representa la barra/drawer de información del contacto al estilo WhatsApp Web.
 * 
 * Props:
 * - contact: objeto con los datos del contacto seleccionado (name, phone, info, status, etc.)
 * - onClose: función callback para cerrar el panel al pulsar el botón 'X'
 */
const ContactProfileDrawer = ({ contact, onClose }) => {
    if (!contact) return null

    const initial = contact.name ? contact.name.charAt(0).toUpperCase() : '?'
    const avatarBg = getAvatarColor(contact.name || '')

    return (
        <aside className="profile-drawer" id={`profile-drawer-${contact.id}`}>
            {/* Cabecera del Drawer */}
            <header className="profile-drawer-header">
                <button 
                    className="icon-btn close-btn" 
                    onClick={onClose} 
                    title="Cerrar info. del contacto"
                    aria-label="Cerrar información"
                    id="close-profile-btn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h2 className="profile-drawer-title">Info. del contacto</h2>
            </header>

            {/* Contenido deslizable del perfil */}
            <div className="profile-drawer-content">
                {/* 1. Tarjeta de Avatar Gigante y Datos Principales */}
                <section className="profile-card hero-section">
                    <div className="profile-avatar-large" style={{ backgroundColor: avatarBg }}>
                        {contact.avatarUrl ? (
                            <img src={contact.avatarUrl} alt={contact.name} className="avatar-img-large" />
                        ) : (
                            initial
                        )}
                    </div>
                    <h3 className="profile-contact-name">{contact.name}</h3>
                    <span className="profile-contact-phone">{contact.phone || '+54 9 11 0000-0000'}</span>

                    {/* Botones de acción rápida estilo WhatsApp */}
                    <div className="profile-quick-actions">
                        <button className="quick-action-btn" title="Llamar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>Audio</span>
                        </button>
                        <button className="quick-action-btn" title="Videollamada">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                            <span>Video</span>
                        </button>
                        <button className="quick-action-btn" title="Buscar en mensajes">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <span>Buscar</span>
                        </button>
                    </div>
                </section>

                {/* 2. Sección "Info." / Estado / Bio */}
                <section className="profile-card info-section">
                    <span className="profile-section-label">Info.</span>
                    <p className="profile-info-text">{contact.info || '¡Hola! Estoy usando WhatsApp.'}</p>
                    <span className="profile-info-date">{contact.infoDate ? `Actualizado el ${contact.infoDate}` : 'Info. reciente'}</span>
                </section>

                {/* 3. Sección "Archivos, enlaces y documentos" */}
                <section className="profile-card media-section">
                    <div className="profile-menu-row clickable">
                        <span>Archivos, enlaces y docs</span>
                        <div className="row-right">
                            <span className="count-badge">0</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 4. Opciones de Configuración y Privacidad */}
                <section className="profile-card options-section">
                    <div className="profile-menu-row clickable">
                        <div className="row-left">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-icon">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span>Notificaciones silenciadas</span>
                        </div>
                        <input type="checkbox" className="toggle-checkbox" aria-label="Silenciar notificaciones" />
                    </div>

                    <div className="profile-menu-row clickable">
                        <div className="row-left">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-icon">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>Mensajes destacados</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>

                    <div className="profile-menu-row clickable">
                        <div className="row-left">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-icon">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <div className="text-column">
                                <span>Cifrado del chat</span>
                                <small className="sub-text">Los mensajes están cifrados de extremo a extremo</small>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Opciones Destructivas (Bloquear / Reportar) */}
                <section className="profile-card danger-section">
                    <button className="danger-row-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                        <span>Bloquear a {contact.name}</span>
                    </button>

                    <button className="danger-row-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>Reportar contacto</span>
                    </button>
                </section>
            </div>
        </aside>
    )
}

export default ContactProfileDrawer
