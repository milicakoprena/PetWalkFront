import {
    EnvironmentOutlined, 
    PlusCircleOutlined, 
    UnorderedListOutlined, 
    FormOutlined, 
    EditOutlined, 
    StarOutlined, 
    ExclamationCircleOutlined,
    TeamOutlined,
    LogoutOutlined,
    NotificationOutlined,
    ScheduleOutlined,
    BarChartOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Menu, Radio, Space, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import "../util.js/constants";
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER } from '../util.js/constants';
import axios from "axios";
import { HeaderImage } from './CssComponents';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const ownerItems = [
    getItem('Uredi profil', "/editprofileownerpage", <EditOutlined />),
    getItem('Dodaj ljubimca', "/addpetpage", <PlusCircleOutlined />),
    getItem('Lista čuvara', "/walkerlist", <TeamOutlined />),
    getItem('Oglasna tabla', "/adlist", <NotificationOutlined />),
    getItem('Moji ljubimci', "/mypetslist", <UnorderedListOutlined />),
    getItem('Izvještaji', "/reportpage", <FormOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
    getItem('Odjavi se', "/", <LogoutOutlined />),
]

const walkerItems = [
    getItem('Uredi profil', "/editprofile", <EditOutlined />),
    getItem('Lista ljubimaca', "/petlist", <UnorderedListOutlined />),
    getItem('Oglasna tabla', "/adlist", <NotificationOutlined  />),
    getItem('Lista čuvanja', "/rasporedpage", <ScheduleOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Statistika', "/statisticspage", <BarChartOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
    getItem('Odjavi se', "/", <LogoutOutlined />),
]

const adminItems = [
    getItem('Lista naloga', "/accountlistpage", <UnorderedListOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Pregled oglasa', "/adlist", <NotificationOutlined />),
    getItem('Pregled prijava problema', "/problemview", <ExclamationCircleOutlined />),
    getItem('Pregled naselja', "/placespage", <HomeOutlined />),
    getItem('Odjavi se', "/", <LogoutOutlined />),
]

let items = walkerItems;
let selectedValue = 1;

const MainMenu = () => {
    const navigate=useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        onChange();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        navigate("/");
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const userState = useLocation();
    const user = userState.state.user;
    let isAdmin = false;
    const role = user.role;

    if(role === ROLE_ADMIN) {
        items = adminItems;
        isAdmin = true;
    }
    else if(role === ROLE_OWNER) items = ownerItems;
    else if (role === ROLE_WALKER) items = walkerItems;

    if(items===walkerItems)
    {
        selectedValue=1;
    }
    else if(items===ownerItems)
    {
        selectedValue=2;
    }

    const [value, setValue] = useState(selectedValue);

    const onChange = async () => {
        const request = {
            id: user.id,
            role: user.role === ROLE_OWNER ? ROLE_WALKER : ROLE_OWNER,
        };
     
        return await axios
            .patch(`http://localhost:9000/korisnici/${user.id}/role`, request, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(() => {
                navigate("/loginpage",
                {
                    state: {user}
                }); 
            })
            .catch((e) => console.log(e));
    };

    return (
        <div  
            style={{
                minHeight: '100vh'
            }}>
            <div
                style={{
                    height: 40,
                    margin: 16,
                    background: 'rgba(0, 0, 0, 0)',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <HeaderImage src={require('../pages/resources/walking-the-dog.png')} />
            </div>
            <Menu theme="dark"  mode="inline" items={items} onClick={({key}) => 
            {
                if(key==='/') 
                {
                    showModal2();
                }
                else {
                    navigate(key, { state: {user} })
                }
            }}/>
             
            { (!isAdmin) ? (
                <Radio.Group onChange={showModal} value={value} size="middle" style={{ display: 'flex', marginLeft: '11%' }}>
                <Space direction="vertical">
                    <Radio value={1} style={{ color: '#919aa3', fontWeight: '490', padding: '5%' }} >Čuvar</Radio>
                    <Radio value={2} style={{ color: '#919aa3', fontWeight: '490', marginLeft: '5%' }} >Vlasnik</Radio>
                </Space>
               
                <Modal title="Promijeni ulogu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Potvrdi"
                    cancelText="Otkaži">
                    
                    <p>Da li ste sigurni da želite da promijenite ulogu?
                        Pri promjeni uloge potrebno je ponovo se prijaviti na nalog.
                    </p>
                    
                </Modal>
                </Radio.Group> 
            ) : (
               <div></div>
            )}
            
            <Modal title="Odjavi se" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} okText="Da"
                  cancelText="Ne">
                <p>Da li ste sigurni da želite da se odjavite?</p>
            </Modal>
        </div>
    );
};

export default MainMenu;
  