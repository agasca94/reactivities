import React from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { IUser } from '../models/IUser'
import { observer } from 'mobx-react-lite'

interface IProps {
    logout: () => void;
    isLoggedIn: boolean;
    user: IUser | null;
}

const NavBar: React.FC<IProps> = ({ logout, isLoggedIn, user }) => {
    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.push('/');
    }
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img 
                        src='/assets/logo.png' 
                        alt='logo' 
                        style={{marginRight: '10px'}}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} exact to='/activities'/>
                <Menu.Item>
                    <Button 
                        as={NavLink}
                        to='/createActivity'
                        positive 
                        content='"Create Activity'
                    />
                </Menu.Item>

                {user && 
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    as={Link} 
                                    to={`/profile/${user.username}`} 
                                    text='My profile' 
                                    icon='user'
                                />
                                <Dropdown.Item 
                                    onClick={handleLogout} 
                                    text='Logout' 
                                    icon='power' 
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                } 
            </Container>
        </Menu>
    )
}

export default observer(NavBar);
