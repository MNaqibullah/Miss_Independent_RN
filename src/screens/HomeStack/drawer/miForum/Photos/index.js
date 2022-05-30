import React, { useEffect, useState, } from 'react';

import Photos from '../../members/Photos';
import Preference from 'react-native-preference'
import Colors from '../../../../../utils/colors';
import { client } from '../../../../../api/config'
import { ActivityIndicator } from 'react-native';



const componentName = ({ params }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)
        dataApi(1)
        console.log('useEffect')
    }, [])

    const dataApi = (page) => {
        const bodyFormData=new FormData();
        bodyFormData.append('post_id',19)
        client.post(`/PostAssets?page=${page}`, bodyFormData, {
            headers: {
                'Authorization': `Bearer ${Preference.get('token')}`
            }
        })
            .then(response => {
                // setRefreshing(false)
                // Preference.set('fullLoading',false)
                // Preference.set('loading',false)
                // Preference.set('refreshing',false)
                setLoading(false)
                // setFullLoading(false)
                // setTotalPage(response.data.data.last_page)
                if (response.data.data.current_page == 1) {
                    setData(response.data.data.data)
                }//if
                else {
                    let array = [...data]
                    array.push(response.data.data.data)
                    setData(array)
                }
            })
            .catch(error => {
                // setRefreshing(false)
                setLoading(false)
                // setFullLoading(false)
                console.log('error in Mi forum index', error)
            })
    }//dataApi


    return (
        loading ?
            <ActivityIndicator size="large" color={Colors.cadetBlue}/>
         :
            <Photos data={data}/>

    );
}

export default componentName;
