import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import MainMenu from "../../components/MainMenu";
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"
import { Page, Cover, StyledTable } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const RasporedPage = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [pets, setPets] = useState([]);
    const [rasporedi, setRasporedi] = useState([]);
    const [types, setTypes] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    

    const columns = [
        {
            title: 'Ime vlasnika',
            dataIndex: 'vlasnik',
        },
        {
            title: 'Ime ljubimca',
            dataIndex: 'ljubimac',
        },
        {
            title: 'Datum',
            dataIndex: 'datum',
        },
        {
            title: 'Ukupno vrijeme',
            dataIndex: 'vrijeme',
            width: '15%',
        },
        
        {
            title: 'Ukupna zarada',
            dataIndex: 'zarada',
           
        },
        
        
    ];

    useEffect(() => {
        axios.get(`http://localhost:9000/ljubimci`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let temp = [];
            for(let i = 0; i < res.data.length; i++){
                temp.push({
                    id: res.data.at(i).id,
                    ime: res.data.at(i).ime,
                })
            }
            setPets(res.data);
        })
        .catch((e) => console.log(e));

        axios.get(`http://localhost:9000/rasporedi`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let tempRasporedi = [];
            let tempRaspored = '';
            for(let i = 0; i < res.data.length; i++)
            {
                let userId = res.data.at(i).korisnikId;
                
                if(userId===user.id){
                    tempRaspored = {
                        vlasnik: 'vlasnik blabla',
                        ljubimac : pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
                        id: res.data.at(i).id,
                        datum: res.data.at(i).datum.slice(0,10),
                        vrijeme: res.data.at(i).vrijemeCuvanja + 'h',
                        zarada: res.data.at(i).ukupnaCijena + 'KM',
                    }
                    tempRasporedi.push(tempRaspored);
                }
            }
            setRasporedi(tempRasporedi);
        })
        .catch((e) => console.log(e));
    }, [pets, types, user.token, user.id, rasporedi]);


    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                    maxHeight: '103vh'
                    }}>
                <MainMenu></MainMenu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{
                    maxHeight: '103vh'
                    }}>
                    <Page>
                        <Cover style={{
                            maxHeight: '103vh',
                            backgroundImage: `url(${pozadina})`,
                        }}>
                            <StyledTable
                                columns={columns}
                                dataSource={rasporedi}
                                size="small"
                                pagination={false}
                                style={{height: '500px', overflow: 'auto'}}
                            />
                            
                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default RasporedPage;