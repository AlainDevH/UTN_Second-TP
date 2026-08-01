import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'
import { ThemeContext } from '../../Context/ThemeContext'
import AddContactModal from '../AddContactModal/AddContactModal'
import WhatsappNavRail from '../WhatsappNavRail/WhatsappNavRail'
import './WhatsappSidebar.css'

// Genera un color consistente basado en el nombre para los avatares
const getAvatarColor = (name) => {
    const colors = ['#00a884', '#128c7e', '#075e54', '#34b7f1', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const WhatsappSidebar = () => {
    const { contacts, contact_selected, userProfile, setShowUserProfile } = useContext(ContactContext)
    const { theme, setTheme } = useContext(ThemeContext)

    // Estado para controlar la pestaña activa recibida desde el NavRail o el Menú de 3 puntos
    const [activeTab, setActiveTab] = useState('chats')

    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('Todos')
    const [showAddModal, setShowAddModal] = useState(false)

    // Estado para el menú desplegable de los 3 puntos (⋮)
    const [showMenuDropdown, setShowMenuDropdown] = useState(false)
    const menuRef = useRef(null)

    // Cierra el menú desplegable al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenuDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Cambiar entre Tema Oscuro y Tema Claro
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const selectTab = (tabName) => {
        setActiveTab(tabName)
        setShowMenuDropdown(false)
    }

    // Filtrado de contactos por búsqueda para la pestaña Chats
    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))

        if (activeFilter === 'No leídos') {
            return matchesSearch && contact.unreadCount && contact.unreadCount > 0
        }
        if (activeFilter === 'Grupos') {
            return false
        }
        return matchesSearch
    })

    const totalUnreadCount = contacts.reduce((acc, contact) => acc + (contact.unreadCount || 0), 0)

    // Botones de cabecera compartidos para todos los paneles
    const renderHeaderActions = (titleText) => (
        <header className="sidebar-header">
            <div className="header-left">
                <h2 className="brand-title">{titleText}</h2>
            </div>
            <div className="header-actions" ref={menuRef}>
                {/* Botón de Cambio de Tema */}
                <button
                    className="icon-btn theme-toggle-btn"
                    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    aria-label="Cambiar tema"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    )}
                </button>

                {/* Botón Nuevo Contacto */}
                <button
                    className="icon-btn add-contact-btn"
                    title="Añadir nuevo contacto"
                    aria-label="Nuevo contacto"
                    onClick={() => setShowAddModal(true)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="17" y1="11" x2="23" y2="11"></line>
                    </svg>
                </button>

                {/* MENÚ DE TRES PUNTOS VERTICALES (⋮) CON OPCIONES DEL NAV RAIL */}
                <button
                    className={`icon-btn ${showMenuDropdown ? 'active' : ''}`}
                    title="Menú de opciones"
                    aria-label="Menú"
                    onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                    id="three-dots-menu-btn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>

                {/* DESPLEGABLE CON LAS OPCIONES (SOLO TEXTO SIN ICONOS POR SOLICITUD) */}
                {showMenuDropdown && (
                    <div className="sidebar-dropdown-menu" id="three-dots-dropdown">
                        <button className={`dropdown-item ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => selectTab('chats')}>
                            Chats
                        </button>
                        <button className={`dropdown-item ${activeTab === 'calls' ? 'active' : ''}`} onClick={() => selectTab('calls')}>
                            Llamadas
                        </button>
                        <button className={`dropdown-item ${activeTab === 'status' ? 'active' : ''}`} onClick={() => selectTab('status')}>
                            Estados
                        </button>
                        <button className={`dropdown-item ${activeTab === 'channels' ? 'active' : ''}`} onClick={() => selectTab('channels')}>
                            Novedades
                        </button>
                        <button className={`dropdown-item ${activeTab === 'communities' ? 'active' : ''}`} onClick={() => selectTab('communities')}>
                            Comunidades
                        </button>
                        <button className={`dropdown-item ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => selectTab('archived')}>
                            Archivados
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={() => { setShowUserProfile(true); setShowMenuDropdown(false); }}>
                            Ver mi perfil
                        </button>
                        <button className="dropdown-item" onClick={() => { setShowAddModal(true); setShowMenuDropdown(false); }}>
                            Añadir contacto
                        </button>
                    </div>
                )}
            </div>
        </header>
    )

    // 1. PANEL DE CHATS
    const renderChatsPanel = () => (
        <>
            {renderHeaderActions('Chats')}

            <div className="search-container">
                <div className="search-box">
                    <span className="search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar o empezar un nuevo chat"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-container">
                {['Todos', 'No leídos', 'Grupos'].map((filter) => (
                    <button
                        key={filter}
                        className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        <span>{filter}</span>
                        {filter === 'No leídos' && totalUnreadCount > 0 && (
                            <span className="chip-badge">{totalUnreadCount}</span>
                        )}
                    </button>
                ))}
            </div>

            <div className="contact-list">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => {
                        const isSelected = contact_selected && contact_selected.id === contact.id
                        const initial = contact.name ? contact.name.charAt(0).toUpperCase() : '?'
                        const avatarBg = getAvatarColor(contact.name || '')
                        const lastMsgObj = contact.messages && contact.messages.length > 0 ? contact.messages[contact.messages.length - 1] : null
                        const lastMessageTime = lastMsgObj ? lastMsgObj.time : ''
                        const hasUnread = Boolean(contact.unreadCount && contact.unreadCount > 0)

                        return (
                            <Link
                                to={`/contact/${contact.id}`}
                                key={contact.id}
                                className={`contact-item ${isSelected ? 'active' : ''}`}
                            >
                                <div className="contact-avatar" style={{ backgroundColor: avatarBg }}>
                                    {contact.avatarUrl ? (
                                        <img src={contact.avatarUrl} alt={contact.name} className="avatar-img" />
                                    ) : (
                                        initial
                                    )}
                                </div>
                                <div className="contact-info">
                                    <div className="contact-header">
                                        <span className="contact-name">{contact.name}</span>
                                        <span className={`contact-time ${hasUnread ? 'unread' : ''}`}>{lastMessageTime}</span>
                                    </div>
                                    <div className="contact-bottom">
                                        <p className={`contact-last-message ${hasUnread ? 'unread-text' : ''}`}>
                                            {contact.lastMessage || 'Sin mensajes'}
                                        </p>
                                        {hasUnread ? (
                                            <span className="unread-badge">{contact.unreadCount}</span>
                                        ) : null}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div className="empty-contacts">
                        No se encontraron contactos
                    </div>
                )}
            </div>
        </>
    )

    // 2. PANEL DE LLAMADAS
    const renderCallsPanel = () => (
        <div className="nav-panel-container">
            {renderHeaderActions('Llamadas')}

            <div className="panel-action-item">
                <div className="action-icon-circle green">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                </div>
                <div className="action-text">
                    <span className="action-title">Crear enlace de llamada</span>
                    <span className="action-subtitle">Comparte un enlace para tu llamada de WhatsApp</span>
                </div>
            </div>

            <div className="panel-section-title">Recientes</div>

            <div className="empty-contacts">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '12px' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <p style={{ margin: 0, fontWeight: '500' }}>Sin registro de llamadas</p>
                <span style={{ fontSize: '12.5px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Las llamadas de voz y video realizadas aparecerán aquí.</span>
            </div>
        </div>
    )

    // 3. PANEL DE ESTADOS
    const renderStatusPanel = () => (
        <div className="nav-panel-container">
            {renderHeaderActions('Estados')}

            <div className="panel-action-item">
                <div className="my-status-avatar-wrapper">
                    <div className="contact-avatar" style={{ backgroundColor: getAvatarColor(userProfile?.name || 'AlainDev') }}>
                        {userProfile?.avatarUrl ? (
                            <img src={userProfile.avatarUrl} alt={userProfile.name} className="avatar-img" />
                        ) : (
                            userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'A'
                        )}
                    </div>
                    <span className="add-status-badge">+</span>
                </div>
                <div className="action-text">
                    <span className="action-title">Mi estado</span>
                    <span className="action-subtitle">Añade una actualización</span>
                </div>
            </div>

            <div className="panel-section-title">Recientes</div>

            <div className="empty-contacts">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '12px' }}>
                    <circle cx="12" cy="12" r="9" strokeDasharray="4 2"></circle>
                    <circle cx="12" cy="12" r="5"></circle>
                </svg>
                <p style={{ margin: 0, fontWeight: '500' }}>Sin actualizaciones de estado</p>
                <span style={{ fontSize: '12.5px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Las actualizaciones de tus contactos aparecerán aquí.</span>
            </div>
        </div>
    )

    // 4. PANEL DE CANALES / NOVEDADES
    const renderChannelsPanel = () => (
        <div className="nav-panel-container">
            {renderHeaderActions('Novedades')}

            <div className="search-container">
                <div className="search-box">
                    <span className="search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input type="text" className="search-input" placeholder="Buscar canales" />
                </div>
            </div>

            <div className="panel-action-item">
                <div className="action-icon-circle green">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                <div className="action-text">
                    <span className="action-title">Crear un canal</span>
                    <span className="action-subtitle">Comparte novedades con tus seguidores</span>
                </div>
            </div>

            <div className="panel-section-title">Canales</div>

            <div className="empty-contacts">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '12px' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <p style={{ margin: 0, fontWeight: '500' }}>Mantente al día sobre los temas que te interesan</p>
                <span style={{ fontSize: '12.5px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Busca y sigue canales para recibir novedades aquí.</span>
            </div>
        </div>
    )

    // 5. PANEL DE COMUNIDADES
    const renderCommunitiesPanel = () => (
        <div className="nav-panel-container">
            {renderHeaderActions('Comunidades')}

            <div className="panel-action-item">
                <div className="action-icon-circle green">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <line x1="19" y1="8" x2="19" y2="14"></line>
                        <line x1="16" y1="11" x2="22" y2="11"></line>
                    </svg>
                </div>
                <div className="action-text">
                    <span className="action-title">Nueva comunidad</span>
                </div>
            </div>

            <div className="panel-section-title">Tus comunidades</div>

            <div className="empty-contacts">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '12px' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p style={{ margin: 0, fontWeight: '500' }}>Organiza tus grupos en comunidades</p>
                <span style={{ fontSize: '12.5px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Conecta varios grupos y envía anuncios a todos tus miembros fácilmente.</span>
            </div>
        </div>
    )

    // 6. PANEL DE ARCHIVADOS
    const renderArchivedPanel = () => (
        <div className="nav-panel-container">
            {renderHeaderActions('Archivados')}

            <div className="search-container">
                <div className="search-box">
                    <span className="search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input type="text" className="search-input" placeholder="Buscar en archivados" />
                </div>
            </div>

            <div className="empty-contacts">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '12px' }}>
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                <p style={{ margin: 0, fontWeight: '500' }}>No tienes chats archivados</p>
                <span style={{ fontSize: '12.5px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Los chats que archives se mostrarán aquí.</span>
            </div>
        </div>
    )

    return (
        <div className="sidebar-container-wrapper">
            {/* Barra Vertical de Navegación interactiva */}
            <WhatsappNavRail
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenProfile={() => setShowUserProfile(true)}
            />

            <aside className="whatsapp-sidebar">
                {activeTab === 'chats' && renderChatsPanel()}
                {activeTab === 'calls' && renderCallsPanel()}
                {activeTab === 'status' && renderStatusPanel()}
                {activeTab === 'channels' && renderChannelsPanel()}
                {activeTab === 'communities' && renderCommunitiesPanel()}
                {activeTab === 'archived' && renderArchivedPanel()}
            </aside>

            {/* Modal para añadir contacto */}
            {showAddModal && (
                <AddContactModal onClose={() => setShowAddModal(false)} />
            )}
        </div>
    )
}

export default WhatsappSidebar