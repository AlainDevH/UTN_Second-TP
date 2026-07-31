import React, { useContext, useState } from 'react'
import { ContactContext } from '../../Context/ContactContext'
import './UserProfileDrawer.css'

const getAvatarColor = (name = 'AlainDev') => {
    const colors = ['#00a884', '#128c7e', '#075e54', '#34b7f1', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const UserProfileDrawer = ({ onClose }) => {
    const { userProfile, setUserProfile } = useContext(ContactContext)

    const [isEditingName, setIsEditingName] = useState(false)
    const [nameValue, setNameValue] = useState(userProfile.name || 'AlainDev')

    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [infoValue, setInfoValue] = useState(userProfile.info || '¡Hola! Estoy usando WhatsApp.')

    const initial = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'A'
    const avatarBg = getAvatarColor(userProfile.name || 'AlainDev')

    const handleSaveName = () => {
        if (nameValue.trim() !== '') {
            setUserProfile(prev => ({ ...prev, name: nameValue.trim() }))
        } else {
            setNameValue(userProfile.name)
        }
        setIsEditingName(false)
    }

    const handleSaveInfo = () => {
        if (infoValue.trim() !== '') {
            setUserProfile(prev => ({ ...prev, info: infoValue.trim() }))
        } else {
            setInfoValue(userProfile.info)
        }
        setIsEditingInfo(false)
    }

    return (
        <aside className="user-profile-drawer" id="user-profile-drawer">
            {/* Header del Perfil de Usuario */}
            <header className="user-profile-header">
                <button
                    className="icon-btn close-user-profile-btn"
                    onClick={onClose}
                    title="Cerrar perfil"
                    aria-label="Cerrar perfil"
                    id="close-user-profile-btn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h2 className="user-profile-title">Info. del usuario</h2>
            </header>

            {/* Contenido del Perfil */}
            <div className="user-profile-body">
                {/* 1. Foto de perfil grande */}
                <div className="user-profile-avatar-container">
                    <div className="user-profile-avatar-wrapper" style={{ backgroundColor: avatarBg }}>
                        {userProfile.avatarUrl ? (
                            <img src={userProfile.avatarUrl} alt={userProfile.name} className="user-profile-avatar-img" />
                        ) : (
                            <span className="user-avatar-initial">{initial}</span>
                        )}
                        <div className="avatar-overlay" title="Cambiar foto de perfil">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                            <span>CAMBIAR FOTO DE PERFIL</span>
                        </div>
                    </div>
                </div>

                {/* 2. Sección del Nombre */}
                <div className="user-profile-section">
                    <span className="section-label">Tu nombre</span>
                    {isEditingName ? (
                        <div className="edit-field-row">
                            <input
                                type="text"
                                className="edit-input"
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                                maxLength={25}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveName()
                                    if (e.key === 'Escape') setIsEditingName(false)
                                }}
                            />
                            <button className="icon-btn save-btn" onClick={handleSaveName} title="Guardar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="display-field-row">
                            <span className="field-value-text">{userProfile.name}</span>
                            <button
                                className="icon-btn edit-btn"
                                onClick={() => setIsEditingName(true)}
                                title="Editar nombre"
                                aria-label="Editar nombre"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    <p className="section-note">
                        Este no es tu nombre de usuario ni un PIN. Este nombre será visible para tus contactos de WhatsApp.
                    </p>
                </div>

                {/* 3. Sección de Info / Estado */}
                <div className="user-profile-section">
                    <span className="section-label">Info.</span>
                    {isEditingInfo ? (
                        <div className="edit-field-row">
                            <input
                                type="text"
                                className="edit-input"
                                value={infoValue}
                                onChange={(e) => setInfoValue(e.target.value)}
                                maxLength={140}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveInfo()
                                    if (e.key === 'Escape') setIsEditingInfo(false)
                                }}
                            />
                            <button className="icon-btn save-btn" onClick={handleSaveInfo} title="Guardar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="display-field-row">
                            <span className="field-value-text">{userProfile.info}</span>
                            <button
                                className="icon-btn edit-btn"
                                onClick={() => setIsEditingInfo(true)}
                                title="Editar info"
                                aria-label="Editar info"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* 4. Sección de Teléfono */}
                <div className="user-profile-section">
                    <span className="section-label">Teléfono</span>
                    <div className="display-field-row">
                        <span className="field-value-text static-phone">{userProfile.phone}</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default UserProfileDrawer
