import React, { useState } from 'react'

function LoginScreen () {
    // Estado local para el nombre de usuario
    const [name, setName] = useState('')

    // Maneja el submit del form (por ahora solo evita el refresh)
    function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return
        // En proyectos reales aquí haríamos login/redirect
        alert('Bienvenido ' + name)
    }

    // Estilos simples inline para que sea fácil de entender
    const cardStyle = { width: '90%', maxWidth: 360, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, boxSizing: 'border-box' }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form style={cardStyle} onSubmit={handleSubmit}>
                <h2 style={{ marginTop: 0 }}>Iniciar sesión</h2>
                <label>Nombre</label>
                <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8, marginBottom: 12 }} />
                <button style={{ padding: '8px 12px' }} type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default LoginScreen