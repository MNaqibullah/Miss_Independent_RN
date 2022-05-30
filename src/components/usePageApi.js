import { useState } from 'react';
import Preference from 'react-native-preference'

import { client } from '../api/config';
function usePageApi(apiPath, uid, type) {
    const [data, setData] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState({
        currentPage: 1,
        totalPage: 1,
    })
    const onRefresh = () => {
        setRefresh(true)
        setPages({
            currentPage: 1,
            totalPage: 1,
        })
        getData(1)
    };
    const onEndReached = () => {
        if (pages.currentPage < pages.totalPage) {
            setLoading(true)
            getData(pages.currentPage + 1)
        }
    }
    const getData = async (page) => {
        let body = new FormData();
        body.append('user_id', uid)
        body.append('type', type)
        const res = await client.post(apiPath, body, {
            headers: {
                'Authorization': `Bearer ${Preference.get('token')}`
            },
            params: {
                page
            }
        })
        setRefresh(false)
        setLoading(false)
        setPages({ currentPage: res.data.data.current_page, totalPage: res.data.data.last_page })
        if (res.data.data.current_page > 1) {
            setData([...data, ...res.data.data.data])
        } else
            setData(res.data.data.data)
        console.log('response======>',res.data);
    }
    return { getData, data, onRefresh, refresh, onEndReached, loading }
}
export default usePageApi