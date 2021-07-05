import { useHistory } from 'react-router';
import { useEffect } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/g-normal.png';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.scss';


export function Login() {
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();

    useEffect(() => {

        if (user) {
            history.push('/');
        }

    }, [user, history]);




    async function logInWithGoogle() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/');
    }

    return (
        <div id="page-login">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <button onClick={logInWithGoogle} className="login">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Entrar com a Conta do Google
                    </button>

                </div>
            </main>
        </div>
    )
}