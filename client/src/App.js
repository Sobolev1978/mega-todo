import './App.scss';
import TodoList from "./pages/TodoList";
import {Layout} from "antd";
import Login from "./pages/Login/Login";
import {Link, Switch} from "react-router-dom";
import {PageHeader, Button} from 'antd';
import {FaHome} from "react-icons/all";
import Registration from "./pages/Registration/Registration";
import {memo, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./actions";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./hoc/ErrorBoundary";
import Loader from "./components/Loader";
import tokenStorage from "./tokenStorage";

const {Content, Header} = Layout;

function App() {
    const {isAuth, loading} = useSelector(state => state)
    const dispatch = useDispatch()

    const handlerLogout = () => {
        tokenStorage.removeToken()
        dispatch(logout())
    }

    const LogoutButton = useMemo(() => (<Button onClick={handlerLogout} key={'Link_to_/logout'}>Logout</Button>), [])

    const RegistrationButton = useMemo(() => (
        <Link key={'Link_to_/registration'} to='/registration'>
            <Button path='/registration'>Registration</Button>
        </Link>
    ), [])

    const LoginButton = useMemo(() => (
        <Link key={'Link_to_/login'} to='/login'>
            <Button path='/login' type="primary">Login</Button>
        </Link>
    ), [])

    const headerButtons = useMemo(() => {
        return isAuth ? [LogoutButton] : [RegistrationButton, LoginButton]
    }, [isAuth])

    return (
        <Layout>
            <ErrorBoundary>
                <Loader loading={loading}/>
                <Header>
                    <Link className={'todo_home'} key={'Link_to_/'} to='/'>
                        <FaHome className={'fa_home'}/>
                    </Link>
                    <PageHeader extra={headerButtons}>
                    </PageHeader>

                </Header>

                <Content>
                    <Switch>
                        <PrivateRoute auth={isAuth} redirectTo={"/login"} exact path="/" component={TodoList}/>
                        <PrivateRoute auth={!isAuth} redirectTo={"/"} path="/registration" component={Registration}/>
                        <PrivateRoute auth={!isAuth} redirectTo={"/"} path="/login" component={Login}/>
                    </Switch>
                </Content>
            </ErrorBoundary>
        </Layout>
    )
}

export default memo(App);
