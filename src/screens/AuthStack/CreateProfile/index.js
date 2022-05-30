
import React, { useState, useReducer, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { styles } from './Style'
import { Picker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import Icons from './../../../assets/icons/'
import icons from "./../../../assets/icons/";
import colors from "../../../utils/colors";
import images from '../../../assets/images/index';
import Header from '../../../components/Header';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import CheckBox from '../../../components/CheckBox'
import countries from '../../../components/countries'
import { client } from '../../../api/config'
import Preference from 'react-native-preference';
import { Button } from "react-native-elements";
import SimpleToast from "react-native-simple-toast";
import { Platform } from "react-native";
import moment from 'moment';
import MultiSelect from 'react-native-multiple-select';
import CancelIcon from 'react-native-vector-icons/Entypo';




const reducer = (state, action) => {
    switch (action.Input_Type) {
        case 'fullName':
            return { ...state, fullName: action.payload }
        case 'bussinessName':
            return { ...state, bussinessName: action.payload }
        case 'bussinessEmail':
            return { ...state, bussinessEmail: action.payload }
        case 'about':
            return { ...state, about: action.payload }
        case 'emailAddress':
            return { ...state, emailAddress: action.payload }
        default:
            return state;
    }
}//reducer



const categoryList = [{ name: 'Alternative Medicine', isSelect: false }, { name: 'Artist and Painters', isSelect: false }]
const CreateProfile = ({ navigation }) => {
    const countryArray = countries();
    const borderRadius = 13;
    const [state, Dispatch] = useReducer(reducer, {
        fullName: ''
        , bussinessName: '', bussinessEmail: '', about: '', emailAddress: '', memberCategory: ''
    });
    const [facebook, setFacebook] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [selectedLabel, setselectedLabel] = useState('');
    const [selectedLabel2, setselectedLabel2] = useState([]);
    const [imageOptions, showOptions] = useState(false);
    const [general, setGeneral] = useState([]);
    const [coaching, setCoaching] = useState([]);
    const [softKills, setSoftSkills] = useState([]);
    const [consultancy, setConultancy] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState(false);
    const [visible_to_admin_only, setVisible_to_admin_only] = useState(false);
    const checkBox = icons.checkbox_empty
    const [categoryList, setCategoryList] = useState([])
    const [categoryList2, setCategoryList2] = useState([])
    const [categoryList3, setCategoryList3] = useState([])
    const [categoryList4, setCategoryList4] = useState([])
    const [categoryList5, setCategoryList5] = useState([])
    const [jugarh, setJugarh] = useState(false)
    const [disableCountry, setDisableCountry] = useState(false)
    const generalRef = useRef(null)
    const coachRef = useRef(null)
    const softKillsRef = useRef(null)
    const consultancyRef = useRef(null)
    const countryRef = useRef(null)
    ///////////////////////////////////////////////////////////////////////
    const CreateProfile = (array) => {
        const regex = /\d/;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!state.fullName) {
            SimpleToast.show('Please enter your name')
        } else if (regex.test(state.fullName)) {
            SimpleToast.show('Name should not have digits in it.')
        } else if (reg.test(state.bussinessEmail) === false && state.bussinessEmail) {
            SimpleToast.show('Email format is not valid');
        } else if (!state.about) {
            SimpleToast.show('About me cannot Be empty')
        }
        else if (!selectedLabel || selectedLabel == 'default' || selectedLabel == 8) {
            SimpleToast.show('Select a membership category')
        }
        else if (array.length == 0) {
            SimpleToast.show('Select at least one category')
        }
        else if (selectedLabel2.length == 0) {
            SimpleToast.show('Based in cannot be empty')
        }
        else if (!categoryList5) {
            SimpleToast.show('Select minimum of 1 country in service provided')
        }
        else if (!term) {
            SimpleToast.show('You need to agree to the terms of services')
        } else
            createProfileApi(array)
    }//createProfile
    ////////////////////
    const createProfileApi = (array) => {
        setLoading(true)
        let bodyFormData = new FormData();
        console.log('createProfileApi-categoryList5', categoryList5.length)
        console.log('createProfileApi-data', array.length)
        categoryList5.forEach((item) => {
            bodyFormData.append(`service_provided_to[]`, item)
        })
        array.forEach((item) => {
            bodyFormData.append(`user_categories[]`, item)
        })
        bodyFormData.append('name', state.fullName);
        bodyFormData.append('business_name', state.bussinessName);
        bodyFormData.append('business_email', state.bussinessEmail);
        bodyFormData.append('about_me', state.about);
        bodyFormData.append('role_id', parseInt(selectedLabel));
        bodyFormData.append('based_in', ...selectedLabel2);
        bodyFormData.append('social_link_facebook', facebook);
        bodyFormData.append('social_link_twitter', twitter);
        bodyFormData.append('social_link_instagram', instagram);
        bodyFormData.append('social_link_youtube', youtube);
        bodyFormData.append('social_link_tiktok', tiktok);
        bodyFormData.append('webiste_link', website);
        bodyFormData.append('visible_to_admin_only', visible_to_admin_only ? 1 : 0);
        bodyFormData.append('image', profileImage)
        console.log(bodyFormData);
        createProfileApiHit(bodyFormData)

    }//create profile api

    const createProfileApiHit = (bodyFormData) => {
        client.post('/profile/create', bodyFormData, {
            headers: {
                "Authorization": `Bearer ${Preference.get('token')}`,
            }
        })
            .then(response => {
                if (response.data.status === "Success") {
                    setLoading(false)
                    SimpleToast.show(response.data.message)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeStack' }],
                    })
                }
                else {
                    setLoading(false)
                    SimpleToast.show(response.data.message);
                    // console.log(response.data)
                }
            })
            .catch(err => {
                setLoading(false)
                SimpleToast.show('Something went wrong')
                console.log('createProfile      ', err)
            })
    }
    ///////////////////////////////////////////////////
    const categories = (cat) => {
        client.get(`/categories?for=${cat}`, {
            headers: {
                'Authorization': `Bearer ${Preference.get('token')}`
            }
        }).then(response => {

            if (cat.localeCompare('general') == 0) {

                setGeneral(response.data.data)
            }
            else if (cat.localeCompare('coaching-training') == 0) {
                setCoaching(response.data.data)
            }
            else if (cat.localeCompare('soft-skills-coaching-training') == 0) {
                setSoftSkills(response.data.data)
            }
            else if (cat.localeCompare('service-consultancy') == 0) {
                setConultancy(response.data.data)
            }
            else
                console.log('wrong category type')

        }).catch(error => console.log(error))
    }//categories
    /////////////////////////////////////////////////////////////////
    const allSelectedcategories = () => {
        let generalTemp = [];
        let coachesTemp = [];
        let softKillsTemp = [];
        let consultancyTemp = [];
        if (categoryList.length > 0) {
            generalTemp = findSlug(categoryList, general);
        }
        if (categoryList2.length > 0) {
            coachesTemp = findSlug(categoryList2, coaching);
        }
        if (categoryList3.length > 0) {
            softKillsTemp = findSlug(categoryList3, softKills);
        }
        if (categoryList4.length > 0) {
            consultancyTemp = findSlug(categoryList4, consultancy);
        }

        //console.log('categoryList', consultancyTemp);

        let array = generalTemp.concat(coachesTemp, softKillsTemp, consultancyTemp)
        setData(array)
        CreateProfile(array)
    }
    const findSlug = (selectedList, categoryList) => {
        const tempGeneral = selectedList.map((id) => {
            return categoryList.find(item => item.id == id)

        })

        const category = tempGeneral.map((item) => {
            return item.slug
        })
        return category;
    }
    //adding arrays
    /////////////////////////////////////////////////////////////////

    const openPicker = () => {
        const pickerOptions = {
            quality: 0.5,
        };
        launchImageLibrary(pickerOptions, (response) => {
            console.log(response);
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorMessage) {
                console.log("Error: ", response.errorMessage);
            } else {
                console.log(response)
                const source = {
                    uri:
                        Platform.OS === 'ios'
                            ? 'File:///' + response.uri.replace("file://", "")
                            : response.uri,
                    name: moment().format('x') + '.jpeg',
                    type: 'image/jpeg',
                };
                setProfileImage(source)
                console.log("uploaded", response);
            }
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    const adding = (name) => {
        if (categoryList.indexOf(name) == -1) {
            setCategoryList([...categoryList, name]);
        }
        else {
            setCategoryList((categoryList.filter(item => item !== name)))
        }
        console.log('array1', categoryList)
    }//adding

    const adding2 = (name) => {
        if (categoryList2.indexOf(name) == -1) {
            setCategoryList2([...categoryList2, name]);
        }
        else {
            setCategoryList2((categoryList2.filter(item => item !== name)))
        }
        console.log('array2', categoryList2)
    }//adding 2

    const adding3 = (name) => {
        if (categoryList3.indexOf(name) == -1) {
            setCategoryList3([...categoryList3, name]);
        }
        else {
            setCategoryList3((categoryList3.filter(item => item !== name)))
        }
        console.log('array3', categoryList3)
    }//adding 3

    const adding4 = (name) => {
        if (categoryList4.indexOf(name) == -1) {
            setCategoryList4([...categoryList4, name]);
        }
        else {
            setCategoryList4((categoryList4.filter(item => item !== name)))
        }
        console.log('array4', categoryList4)
    }//adding 4

    const adding5 = (name) => {
        if (categoryList5.indexOf(name) == -1) {
            if (name == "worldwide") {
                setCategoryList5([name]);
            } else {
                let array = categoryList5;
                const index = array.indexOf("worldwide");
                if (index > -1) {
                    array.splice(index, 1);
                }
                setCategoryList5([...array, name]);
            }
        }
        else {
            setCategoryList5((categoryList5.filter(item => item !== name)))
        }

    }//adding 4
    const termCondition = () => {
        setTerm(!term)
    }
    const visible_to_admin = () => {
        setVisible_to_admin_only(!visible_to_admin_only)
    }
    /////////////////////////////////////////////////////////////////////////////
    const filtering = (text) => {
        console.log(text)
        const array = general
        array.filter((item) => {
            return text == item.name
        })
        setGeneral(array)
    }

    useEffect(() => {
        categories('general')
        categories('coaching-training')
        categories('soft-skills-coaching-training')
        categories('service-consultancy')
        // if (jugarh)
        //     createProfileApi()
    }, [jugarh])
    useEffect(() => {
        console.log('selectedLabel', selectedLabel);
        if (selectedLabel >= 2 && selectedLabel <= 4) {
            setCategoryList2([]);
            setCategoryList3([]);
            setCategoryList4([]);
        }
        else if (selectedLabel == 5) {
            setCategoryList([]);
            setCategoryList3([]);
            setCategoryList4([]);
        }
        else if (selectedLabel >= 5 && selectedLabel <= 7) {
            setCategoryList([]);
            setCategoryList2([]);

        }
    }, [selectedLabel])
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                name={'Create Profile'}
                leftIconOnPress={() => {
                    console.log(Preference.get('goToLogin'))
                    if (Preference.get('goToLogin') == 2)
                        return navigation.navigate('AuthStack')
                    else
                        return navigation.goBack()
                }}
                leftIcon={Icons.backIcon}
            />
            <KeyboardAwareScrollView style={{ marginHorizontal: 20 }}>
                <Text style={styles.CreateProfileText}>Create Profile on Miss Independent</Text>
                <Text style={styles.YourSelfText}>Almost there! Tell us a little bit more about yourself</Text>
                <View style={styles.PlaceholderView}>
                    <Image style={styles.PlaceHolderStyle} source={!profileImage ? images.palceHolder : profileImage} />
                    <TouchableOpacity
                        onPress={() => openPicker()}
                        style={{ position: 'absolute', justifyContent: "flex-end", alignSelf: 'center', width: "35%", bottom: 40 }}>
                        <Image style={styles.CameraIcon} source={icons.cameraIcon} />
                    </TouchableOpacity>

                </View>


                <FloatingLabelInputField
                    // hideLabel
                    placeholder={'Full Name'}
                    isRequired
                    value={state.fullName}
                    onChangeText={(text) => Dispatch({ Input_Type: 'fullName', payload: text })}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 40, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    // hideLabel
                    placeholder={'Business Name'}
                    // isRequired
                    value={state.bussinessName}
                    onChangeText={(text) => Dispatch({ Input_Type: 'bussinessName', payload: text })}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    // hideLabel
                    placeholder={'Business Email Address'}
                    value={state.bussinessEmail}
                    onChangeText={(text) => Dispatch({ Input_Type: 'bussinessEmail', payload: text })}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    // hideLabel
                    placeholder={'About Me'}
                    isRequired
                    isMultiline={true}
                    multiline={true}
                    value={state.about}
                    onChangeText={(text) => Dispatch({ Input_Type: 'about', payload: text })}
                    inputStyle={{ flex: 1, textAlignVertical: 'top', height: '100%' }}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", minHeight: 100 }}
                />

                <TouchableOpacity
                    onPress={() => { SimpleToast.show("You cannot change your email") }}
                    style={{ borderColor: 'grey', height: 50, borderWidth: 1, borderRadius: 10, justifyContent: 'center', paddingStart: 14, marginTop: 10, }}>
                    <Text style={{ color: 'grey' }}>{Preference.get('email')}</Text>
                </TouchableOpacity>
                <View style={styles.dropdown}>
                    <Picker
                        placeholder={'Membership Category'}
                        onValueChange={(value) => {
                            setselectedLabel(value);
                        }}
                        selectedValue={selectedLabel}>
                        <Picker.Item style={{ color: 'grey' }} label="Membership Category *" value="default" />
                        <Picker.Item label="Tulip" value="2" />
                        <Picker.Item label="Orchid" value="3" />
                        <Picker.Item label="Dhalia" value="4" />

                        <Picker.Item label="Service Provider" value="8" />
                    </Picker>
                    {selectedLabel >= 5 && selectedLabel <= 8 ? <Picker
                        placeholder={'Service Provider'}
                        onValueChange={(value) => {
                            setselectedLabel(value);
                        }}
                        selectedValue={selectedLabel}>
                        <Picker.Item style={{ color: 'grey' }} label="Select your Service *" value="default" />
                        <Picker.Item label="Coach/Mentor" value="5" />
                        <Picker.Item label="Consultant/Trainer" value="6" />
                    </Picker> : null}
                </View>
                {selectedLabel >= 2 && selectedLabel <= 4 ? <View>
                    <Text style={{ fontSize: 19, marginVertical: 20, fontWeight: "bold", color: colors.cadetBlue }}>Category</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, overflow: 'hidden' }}>

                        <MultiSelect

                            fixedHeight
                            styleDropdownMenuSubsection={{ marginTop: 10.5, marginEnd: 30 }}
                            styleRowList={{ padding: 10 }}
                            hideTags
                            items={general}
                            uniqueKey="id"
                            ref={generalRef}
                            onSelectedItemsChange={(value) => setCategoryList(value)}
                            selectedItems={categoryList}
                            selectText="Pick Categories"
                            searchInputPlaceholderText="Search Categories..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            hideSubmitButton

                        />
                    </View>
                    <View>
                        {generalRef?.current?.getSelectedItemsExt(categoryList)}
                    </View>
                    {/* <FlatList
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        data={general}
                        renderItem={({ item }) => {
                            return (

                                <CheckBox
                                    title={item.name}
                                    containerStyle={{}}
                                    image={checkBox}
                                    slug={item.slug}
                                    addItem={(item) => adding(item)}
                                />
                            );
                        }}
                    /> */}
                </View> : null}
                {selectedLabel == 5 && <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.cadetBlue, marginVertical: 20, }}>Coach/Mentor Categories</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, overflow: 'hidden' }}>
                        <MultiSelect
                            fixedHeight
                            styleDropdownMenuSubsection={{ marginTop: 10.5 }}
                            styleRowList={{ padding: 10 }}
                            hideTags
                            items={coaching}
                            uniqueKey="id"
                            ref={coachRef}
                            onSelectedItemsChange={(value) => setCategoryList2(value)}
                            selectedItems={categoryList2}
                            selectText="Pick Categories"
                            searchInputPlaceholderText="Search Categories..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            fixedHeight={false}
                            hideSubmitButton

                        />
                    </View>
                    <View>
                        {coachRef?.current?.getSelectedItemsExt(categoryList2)}
                    </View>
                    {/* <FlatList
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        data={coaching}
                        renderItem={({ item }) => {
                            return (
                                <CheckBox
                                    title={item.name}
                                    containerStyle={{}}
                                    image={checkBox}
                                    slug={item.slug}
                                    addItem={(item) => adding2(item)}
                                />
                            );
                        }}
                    /> */}
                </View>}
                {selectedLabel >= 5 && selectedLabel <= 7 ? <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.cadetBlue, marginVertical: 20, }}>Soft Skills/Coaching/Training
                        Categories</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, overflow: 'hidden' }}>
                        <MultiSelect
                            fixedHeight
                            styleDropdownMenuSubsection={{ marginTop: 10.5 }}
                            styleRowList={{ padding: 10 }}
                            hideTags
                            items={softKills}
                            uniqueKey="id"
                            ref={softKillsRef}
                            onSelectedItemsChange={(value) => setCategoryList3(value)}
                            selectedItems={categoryList3}
                            selectText="Pick Categories"
                            searchInputPlaceholderText="Search Categories..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            hideSubmitButton
                        />
                    </View>
                    <View>
                        {softKillsRef?.current?.getSelectedItemsExt(categoryList3)}
                    </View>
                    {/* <FlatList
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        data={softKills}
                        renderItem={({ item }) => {
                            return (
                                <CheckBox
                                    title={item.name}
                                    containerStyle={{}}
                                    image={checkBox}
                                    slug={item.slug}
                                    addItem={(item) => adding3(item)}
                                />
                            );
                        }}
                    /> */}
                </View> : null}
                {selectedLabel >= 6 && selectedLabel <= 7 ? <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.cadetBlue, marginVertical: 10 }}>Consultancy Categories</Text>
                    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, overflow: 'hidden' }}>
                        <MultiSelect
                            fixedHeight

                            styleDropdownMenuSubsection={{ marginTop: 10.5 }}
                            styleRowList={{ padding: 10 }}
                            hideTags
                            items={consultancy}
                            uniqueKey="id"
                            ref={consultancyRef}
                            onSelectedItemsChange={(value) => setCategoryList4(value)}
                            selectedItems={categoryList4}
                            selectText="Pick Categories"
                            searchInputPlaceholderText="Search Categories..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            hideSubmitButton
                        />
                    </View>
                    <View>
                        {consultancyRef?.current?.getSelectedItemsExt(categoryList4)}
                    </View>
                    {/* <FlatList
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        data={consultancy}
                        renderItem={({ item }) => {
                            return (
                                <CheckBox
                                    title={item.name}
                                    containerStyle={{}}
                                    image={checkBox}
                                    slug={item.slug}
                                    addItem={(item) => adding4(item)}
                                />
                            );
                        }}
                    /> */}
                </View> : null}
                <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.cadetBlue, marginTop: 10, marginBottom: 20 }}>Based In</Text>

                <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, overflow: 'hidden' }}>
                    {selectedLabel2 != '' &&
                        <TouchableOpacity
                            style={styles.cross}
                            onPress={() =>
                                setselectedLabel2('')
                            }>
                            <CancelIcon name="cross" size={23} color='#bfbfbfDD' />
                        </TouchableOpacity>
                    }
                    <MultiSelect
                        styleDropdownMenuSubsection={[{ marginTop: 10.5 }, selectedLabel2 && { marginEnd: 30 }]}
                        fixedHeight
                        styleRowList={{ padding: 10 }}
                        // styleMainWrapper={styleDropdownMenu&&{height:300}}
                        // styleMainWrapper={{height:300}}
                        hideTags
                        items={countryArray}
                        uniqueKey="code"
                        ref={countryRef}
                        onSelectedItemsChange={(value) => setselectedLabel2(value)}
                        selectedItems={selectedLabel2}
                        selectText="Countries"
                        searchInputPlaceholderText="Search Countries..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        single
                        hideSubmitButton

                    />
                </View>
                {/* <View>
                    {countryRef?.current?.getSelectedItemsExt(selectedLabel2)}
                </View> */}
                {/* <View style={styles.dropdown}>
                    <Picker
                        placeholder={'Based in'}
                        onValueChange={(value) => {
                            setselectedLabel2(value);
                        }}
                        selectedValue={selectedLabel2}>
                        <Picker.Item style={{ color: 'grey' }} label="Based In *" value="default" />
                        <Picker.Item label="Oman" value="oman" />
                        <Picker.Item label="Bahrain" value="bahrain" />
                        <Picker.Item label="kuwait" value="kuwait" />
                        <Picker.Item label="Qatar" value="qatar" />
                        <Picker.Item label="Saudi-Arabia" value="saudi-arabia" />
                        <Picker.Item label="UAE" value="uae" />
                    </Picker>
                </View> */}
                <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.cadetBlue, marginTop: 10 }}>Service Provided to</Text>
                <CheckBox
                    title={'WorldWide'}
                    containerStyle={{ marginTop: 20 }}
                    slug={'worldwide'}
                    image={icons.checkbox_empty}
                    setDisableCountry={setDisableCountry}
                    disableCountry={disableCountry}
                    addItem={(item) => adding5(item)}
                />
                {!disableCountry && <View>
                    <CheckBox
                        title={'Oman'}
                        image={icons.checkbox_tick}
                        slug={'oman'}
                        addItem={(item) => adding5(item)}
                    />

                    <CheckBox
                        title={'Bahrain'}
                        image={icons.checkbox_empty}
                        slug={'bahrain'}
                        addItem={(item) => adding5(item)}
                    />
                    <CheckBox
                        title={'Kuwait'}
                        image={icons.checkbox_empty}
                        slug={'kuwait'}
                        addItem={(item) => adding5(item)}
                    />
                    <CheckBox
                        title={'Qatar'}
                        image={icons.checkbox_empty}
                        slug={'qatar'}
                        addItem={(item) => adding5(item)}
                    />
                    <CheckBox
                        title={'Saudi-Arabia'}
                        image={icons.checkbox_empty}
                        slug={'saudi-arabia'}
                        addItem={(item) => adding5(item)}
                    />
                    <CheckBox
                        title={'UAE'}
                        image={icons.checkbox_empty}
                        slug={'uae'}
                        addItem={(item) => adding5(item)}
                    />
                </View>
                }
                <Text style={{ fontWeight: "bold", color: colors.cadetBlue, marginVertical: 10 }}>Website/Social Media</Text>
                {/* <FloatingLabelInputField
                    hideLabel
                    placeholder={'www.example.com'}
                    value={website}
                    onChangeText={(text) => setWebsite(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                /> */}
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter tiktok username'}
                    value={tiktok}
                    onChangeText={(text) => setTiktok(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter facebook username'}
                    value={facebook}
                    onChangeText={(text) => setFacebook(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter twitter username'}
                    value={twitter}
                    onChangeText={(text) => setTwitter(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter instagram username'}
                    value={instagram}
                    onChangeText={(text) => setInstagram(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter youtube channel id '}
                    value={youtube}
                    onChangeText={(text) => setYoutube(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter your website link here '}
                    value={website}
                    onChangeText={(text) => setWebsite(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <CheckBox
                    title={'I agree to terms of services'}
                    containerStyle={{ marginTop: 20 }}
                    image={icons.checkbox_tick}
                    addItem={(term) => termCondition()}
                />
                <CheckBox
                    title={'Information visible to admins only'}
                    image={icons.checkbox_empty}
                    addItem={(term) => visible_to_admin()}
                />

                <Button
                    title="Join"
                    onPress={() => allSelectedcategories()}
                    buttonStyle={{
                        height: 50,
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: colors.cadetBlue,
                        borderRadius: 10,
                    }}
                    containerStyle={{ marginBottom: '2%' }}
                    loading={loading ? true : false}
                />
                <Button

                    buttonStyle={{
                        height: 50,
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}

                />
                {/* <AppButton
                    buttonText={'Join'}
                    TextStyle={{ letterSpacing: 1 }}
                    styles={{ height: 50, width: '100%', alignSelf: 'center', backgroundColor: colors.cadetBlue, borderRadius: 10 }}
                    onPressButton={() => console.log('i m here')}
                /> */}
            </KeyboardAwareScrollView>
            <Modal isVisible={imageOptions}>
                <View style={[styles.modalStyle, { justifyContent: 'flex-end' }]}>
                    <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
                        <View style={{ marginBottom: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    showOptions(false);
                                    setTimeout(() => {
                                        onChooseFromLibraryPress()
                                    }, 1000)
                                }}
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: 'white',
                                    alignItems: 'center', justifyContent: 'center',
                                    borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius
                                }}>
                                <Text style={{ color: colors.cadetBlue, padding: 14, fontSize: 20 }}>
                                    {'Choose from Library'}
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: 2, width: '100%' }} />
                            <TouchableOpacity
                                onPress={() => {
                                    showOptions(false);
                                    setTimeout(() => {
                                        onTakePhotoPress()
                                    }, 1000)
                                }}
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: 'white',
                                    alignItems: 'center', justifyContent: 'center',
                                    borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius
                                }}>
                                <Text style={{ color: colors.cadetBlue, padding: 14, fontSize: 20 }}>{'Take Photo'}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ backgroundColor: 'white', borderRadius: borderRadius, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                showOptions(false);
                            }}>
                            <Text style={{ color: colors.lightGreen, padding: 14, fontSize: 20 }}>{'Cancel'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default CreateProfile;