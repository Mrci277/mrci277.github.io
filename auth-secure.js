// ============================================
// Sistema de Autenticación Seguro
// Contraseña: marcus0parcus2
// Hash SHA256: 7d73dc4978cbba0f787c150e9ced9e387e240f422688245aa22ec6ed1abf00ea
// ============================================

// Hash correcto de la contraseña
const CORRECT_PASSWORD_HASH = '7d73dc4978cbba0f787c150e9ced9e387e240f422688245aa22ec6ed1abf00ea';

// Función para calcular SHA256
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verificar autenticación al cargar
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    
    // Si no está autenticado y no está en la página de login, mostrar login
    if (!isAuthenticated) {
        showLoginPage();
    } else {
        showMainContent();
    }
}

// Mostrar página de login
function showLoginPage() {
    document.body.innerHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Acceso - Marcel Barti CV</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .login-container {
                    background: white;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 400px;
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .login-header h1 {
                    font-size: 1.875rem;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                }

                .login-header p {
                    color: #6b7280;
                    font-size: 0.875rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #1f2937;
                }

                input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    font-family: inherit;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                input:focus {
                    outline: none;
                    border-color: #10b981;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
                }

                button {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #10b981;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #059669;
                }

                button:disabled {
                    background-color: #d1d5db;
                    cursor: not-allowed;
                }

                .error-message {
                    color: #dc2626;
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                    display: none;
                    background-color: #fee2e2;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #dc2626;
                }

                .error-message.show {
                    display: block;
                }

                .footer-text {
                    text-align: center;
                    margin-top: 1.5rem;
                    color: #6b7280;
                    font-size: 0.875rem;
                }

                .logo {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
            </style>
        </head>
        <body>
            <div class="login-container">
                <div class="login-header">
                    <div class="logo">🔐</div>
                    <h1>Marcel Barti</h1>
                    <p>Currículum Profesional</p>
                </div>

                <form id="loginForm">
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Ingresa la contraseña"
                            required
                            autofocus
                        >
                        <div class="error-message" id="errorMessage">
                            ❌ Contraseña incorrecta. Intenta de nuevo.
                        </div>
                    </div>

                    <button type="submit">Acceder</button>
                </form>

                <div class="footer-text">
                    Sitio protegido con contraseña
                </div>
            </div>

            <script>
                document.getElementById('loginForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const passwordInput = document.getElementById('password');
                    const errorMessage = document.getElementById('errorMessage');
                    const password = passwordInput.value;
                    
                    // Calcular hash SHA256 de la contraseña ingresada
                    const passwordHash = await sha256(password);
                    
                    // Comparar con el hash correcto
                    if (passwordHash === '${CORRECT_PASSWORD_HASH}') {
                        sessionStorage.setItem('authenticated', 'true');
                        errorMessage.classList.remove('show');
                        location.reload();
                    } else {
                        errorMessage.classList.add('show');
                        passwordInput.value = '';
                        passwordInput.focus();
                    }
                });

                // Función SHA256
                async function sha256(message) {
                    const msgBuffer = new TextEncoder().encode(message);
                    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    return hashHex;
                }
            </script>
        </body>
        </html>
    `;
}

// Mostrar contenido principal
function showMainContent() {
    // El contenido ya está en el HTML, solo mostrarlo
    document.body.style.display = 'block';
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('authenticated');
    location.reload();
}

// Ejecutar verificación al cargar
document.addEventListener('DOMContentLoaded', checkAuthentication);

console.log('Sistema de autenticación seguro cargado');
