import { useContext } from "react"
import Header from "../../Components/Header/Header"
import WhatsappSidebar from "../../Components/WhatsappSidebar/WhatsappSidebar"
import { ContactContext } from "../../Context/ContactContext"

function HomeScreen (){
    // La pantalla principal muestra la barra lateral de contactos.
    // Se mantiene simple para que sea fácil de entender.
    const { contacts } = useContext(ContactContext)

    const layout = { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }
    const main = { flex: 1, padding: 20 }

    return (
        <div style={layout}>
            {/* Sidebar con lista de contactos */}
            <WhatsappSidebar />

            {/* Area principal: se puede usar para mostrar detalles o bienvenida */}
            <main style={main}>
                <Header />
                <h2 style={{ marginTop: 8 }}>Bienvenido</h2>
                <p>Tenés <strong>{contacts.length}</strong> contactos en la lista.</p>
                <p>Seleccioná un contacto a la izquierda para ver el chat.</p>
            </main>
        </div>
    )
}

export default HomeScreen


/* 
Ejemplo de lista de contactos: 
    const contacts = [
        {
            id,
            nombre,
            fecha_ult_conexion: 'hace 2 dias',
            mensajes_sin_ver: 2
        }
    ]

Crear el componente 
    WhatsappSidebar que debera renderizar la lista de contactos (Con datos aleatorios, almenos 3 conctactos)
    Al dar click en un contacto nos debe llevar a la ruta /contact/{contact_id}
En la ruta 
    / => Debe mostrarse la lista de contactos (El WhatsappSidebar)
    /contact/:contact_id => Debe mostrar el nombre el contacto seleccionado, o que el mismo no existe.

No se preocupen por los estilos ni la tematica, es lo de menos
*/