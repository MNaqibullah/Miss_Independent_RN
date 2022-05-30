/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  FlatList,
  Modal,
  Share,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Container, Header, Title, Left, Body, Footer, Right, Content, } from 'native-base';
import styles from './style';
import Colors from '../../../../utils/colors';
import Icons from '../../../../assets/icons/index';
import TopHeader from '../../../../components/Header';
import VideoPlayer from '../../../../components/VideoPlayer';
import FullImageModal from '../../../../components/fullImage';
import SeeMore from '../../../../components/Seemore';
import CustomInput from '../../../../components/CustomInput';
import SimpleToast from 'react-native-simple-toast';
import { client } from '../../../../api/config'
import Preference from 'react-native-preference'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CancelIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/Feather';
import moment from 'moment'
import img from '../../../../assets/icons/index'
import Images from './../../../../assets/images/index';
import { Platform } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from "react-native-elements";
import Video from 'react-native-video';
import { img_BASE_URL } from '../../../../api/config'
import ImageModal from '../../../../components/ViewPostImage';
import NativeModal from 'react-native-modal';


// import Modal from 'react-native-modal';

function home(props) {
  const [imageModal, setImageModal] = useState(false);
  const [tab, setTab] = useState(0)
  const [latest, setLatest] = useState([])
  const [popular, setPopular] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [myFriends, setMyFriends] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [fullLoading, setFullLoading] = useState(false)
  const [PageCount, setPage] = useState(1)
  const [PageCountPopular, setPagePopular] = useState(1)
  const [PageCountMy, setPageMy] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPagePopular, setTotalPagePopular] = useState(1)
  const [totalPageMy, setTotalPageMy] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [countBool, setCountBool] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isReportMenuVisible, setReportMenuVisible] = useState(false);
  const [comment, setComment] = useState('')
  const [addIcon, setAddIcon] = useState(false)
  const [addPost, setAddPost] = useState(false)
  const [addArticle, setAddArticle] = useState(false)
  const [postDesc, setPostDesc] = useState('')
  const [profileImage, setProfileImage] = useState([]);
  const [videoType, setVideoType] = useState(false);
  const [video, setVideo] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleDesc, setArticleDesc] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reportCommentDesc, setReportCommentDesc] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [pausedVideo, setPausedVideo] = useState(false)
  const [postCreated, setPostCreated] = useState(1)
  const [type, setType] = useState('all')
  const [commentData, setCommentData] = useState([])
  const [postTotalComments, setPostTotalComments] = useState(0)
  const [postIdForComment, setPostIdForComment] = useState(-1)
  const [posterIdForReport, setPosterIdForReport] = useState(-1)
  const [postIdForReport, setPostIdForReport] = useState(-1)
  const [postUserIdForReport, setPostUserIdForReport] = useState(-1)
  const [commentIdForReport, setCommentIdForReport] = useState(-1)
  const [postReportModal, setPostReportModal] = useState(false)
  const [commentReportModal, setCommentReportModal] = useState(false)
  const [isImageVisible, setIsImageVisible] = useState(false)

  const setImageModalVisible = () => setImageModal(!imageModal);

  useEffect(() => {
    setFullLoading(true)
    homeDataApi('all', 1);
    homeDataApi('popular', 1);
    homeDataApi('my', 1);
    console.log('useEffect')
  }, [postCreated])


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const homeDataApi = (tabType, page) => {
    let bodyFormData = new FormData()
    bodyFormData.append('type', tabType)
    bodyFormData.append('page', page)
    client.post('/HomePosts', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        //console.log('page num inside of Api ', page)
        setLoading(false)
        if (response.data.status === 'Success')
         {
           console.log('post--->',response.data.data.data)
          setFullLoading(false)
          if (tabType == 'all') {
            //console.log('all')
            if (response.data.data.current_page === 1) {
              // console.log('current page=1')
              if (data.length != 0) {
                // if (data[0].id == response.data.data.data[0].id) {
                //   // SimpleToast.show('No New Post To Show')
                //   setRefreshing(false)

                // }
                // else {
                setTotalPage(response.data.data.last_page)
                setLatest(response.data.data.data)
                if (tab == 0)
                  setData(response.data.data.data)
                setRefreshing(false)
                // console.log(`  new  post if if if page   :${page}`)
                // }
              }
              else {
                setTotalPage(response.data.data.last_page)
                setLatest(response.data.data.data)
                if (tab == 0)
                  setData(response.data.data.data)
                setRefreshing(false)
                //  console.log(` else if page   :${page}`)
              }
            }
            else {
              // console.log('else 2nd pag2')
              let array = latest
              array.push(...response.data.data.data)
              setLatest(array)
              if (tab == 0)
                setData(array)
            }
          }//nested if type=all
          else if (tabType == 'popular') {
            //console.log('popular')
            if (response.data.data.current_page === 1) {
              // console.log('current page=1')
              if (data.length != 0) {
                // if (data[0].id == response.data.data.data[0].id) {
                //   // SimpleToast.show('No New Post To Show')
                //   setRefreshing(false)
                // }
                // else {
                setTotalPagePopular(response.data.data.last_page)
                setPopular(response.data.data.data)
                if (tab == 1)
                  setData(response.data.data.data)
                setRefreshing(false)
                // console.log(`  new  post if if if page   :${page}`)
                // }
              }
              else {
                setTotalPagePopular(response.data.data.last_page)
                setPopular(response.data.data.data)
                setRefreshing(false)
                //  console.log(` else if page   :${page}`)
              }
            }
            else {
              // console.log('else 2nd pag2')
              let array = popular
              array.push(...response.data.data.data)
              setPopular(array)
              if (tab == 1)
                setData(array)
            }
          }//nested else if
          else if (tabType == 'my') {
            console.log('my=======ytab====>',tab)
            if (response.data.data.current_page === 1) {
              // console.log('current page=1')
              if (data.length != 0) {
                // if (data[0].id == response.data.data.data[0].id) {
                //   // SimpleToast.show('No New Post To Show')
                //   setRefreshing(false)
                // }
                // else {
                setTotalPageMy(response.data.data.last_page)
                setMyPosts(response.data.data.data)
                if (tab == 2)
                  setData(response.data.data.data)
                setRefreshing(false)
                // console.log(`  new  post if if if page   :${page}`)
                // }
              }
              else {
                setTotalPageMy(response.data.data.last_page)
                setMyPosts(response.data.data.data)
                setRefreshing(false)
                //  console.log(` else if page   :${page}`)
              }
            }
            else {
              // console.log('else 2nd pag2')
              let array = myPosts
              array.push(...response.data.data.data)
              setMyPosts(array)
              if (tab == 2)
                setData(array)
            }
          }//nested else if 
          else {
            //console.log('main type else')
          }
        }//if
      })
      .catch(err => {
        setLoading(false)
        console.log('errror  Home' + err)
      })
  }//latest APi
  ///////////////////////////////////////////////////////////////////////////////
  const commentDataIncrementor = (comment) => {
    let randomCommentID = generateRandomNumber(1000000000, 10000000000000)
    console.log(randomCommentID)
    if (!commentData) {
      console.log('if')
      let array = [{
        id: randomCommentID,
        text: comment,
        created_at: null,
        user: {
          image: Preference.get('image_without_baseURL'),
          name: Preference.get('name'),
          id: Preference.get('user_id'),

        }
      }]
      setCommentData(array)

    }//if
    else {
      console.log('else')
      let array = commentData
      array.push({
        id: randomCommentID,
        text: comment,
        created_at: null,
        user: {
          image: Preference.get('image_without_baseURL'),
          name: Preference.get('name'),
          id: Preference.get('user_id'),
        }
      })
      setCommentData(array)

    }//else
    setComment(null)
    // SimpleToast.show('Comment Created')

  }//
  const createComment = (post_id, comment) => {
    let bodyFormData = new FormData();
    bodyFormData.append('post_id', post_id)
    bodyFormData.append('text', comment)
    setComment('')
    // console.log(bodyFormData)
    client.post('/comments', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => {
        if (response.data.status === "Success") {
          setComment(null)
          setPostTotalComments(+postTotalComments + 1)
          commentDataApi(postIdForComment, 1)
          commentIncrementer(post_id)
          console.log('post_id', post_id)
          console.log(response.data.message)
        }
        else
          setFullLoading(false)
      }
      )
      .catch(error => {
        setFullLoading(false)
        SimpleToast.show(error.message)
        console.log('error', error)
      })
  }//createComment


  ///////////////////////////////////////////////////

  const commentDataApi = (id, modalOpener) => {
    if (modalOpener != 1) {
      setFullLoading(true)
      setModalVisible(true)
    }
    console.log('comment data ', id)
    client.get(`comments?post_id=${id}`, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        setFullLoading(false)
        setCommentData(response.data.data)
      })
      .catch(error => {
        setFullLoading(false)
        console.log('error    ', error)
      })
  }//commentDataApi
  //////////////////////////////////////////////////////////////////////////////
  const commentModal = () => {
    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => { setModalVisible(false) }}
      >
        <View style={styles.modalComments}>
          <Container style={{ flex: 1 }}>
            <Header style={{ backgroundColor: 'white' }}>
              <Body><View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="chevron-back" size={25} color="#24bdaf" />
                </TouchableOpacity>
              </View>
              </Body>
              <Body />
              <Body />
              <Body>
                <Text style={{ color: "#24bdaf", marginTop: 2 }}>{postTotalComments} Comments</Text>
              </Body>
            </Header>
            <Content style={{ flex: 1 }}>
              {commentData && commentData.length > 0 ? fullLoading ? null : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={commentData}
                  extraData={commentData}
                  style={styles.containerComments}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, paddingBottom: 10, marginLeft: 10, }}>
                      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 40, }} source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />
                        <View style={{ marginStart: 10, }}>
                          <Text style={{ fontWeight: 'bold', marginTop: 4 }}>{item.user.name}</Text>
                          <Text style={{ fontSize: 10, }}>{item.created_at != null ? delayTime(item.created_at) : 'a few seconds ago'}</Text>
                        </View>
                        <View style={{ flex: 1 }} />

                        <TouchableOpacity
                          onPress={() => {
                            setReportMenuVisible(true)
                            // setPostUserIdForReport(item.user.id)
                            setPosterIdForReport(item.user.id)
                            setCommentIdForReport(item.id)
                          }}
                          style={styles.menuWrapper}>
                          <Image style={[styles.menu, { transform: [{ rotate: '90deg' }], marginEnd: 15 }]} source={Icons.menuIcon} />
                        </TouchableOpacity>

                        {/* {item.user.id == Preference.get('user_id') ?
                         null :
                          <TouchableOpacity
                            onPress={() => {
                              setReportMenuVisible(true)
                              setPosterIdForReport(item.user.id)
                              setCommentIdForReport(item.id)
                            }}
                            style={styles.menuWrapper}>
                            <Image style={[styles.menu, { transform: [{ rotate: '90deg' }], marginEnd: 15 }]} source={Icons.menuIcon} />
                          </TouchableOpacity>
                        } */}
                      </View>
                      <View style={{ backgroundColor: '#f5f7f9', borderRadius: 10, marginHorizontal: '10%', }}>
                        <Text style={{ minHeight: 40, paddingHorizontal: 10, paddingVertical: 5 }}>{item.text}</Text>
                      </View>
                    </View>
                  )}
                />
              ) :
                fullLoading ? null :
                  <View style={styles.commentWrapper}>
                    <Text style={{ fontWeight: 'bold' }}>No Comments yet</Text>
                  </View>
              }

            </Content>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (comment && comment.length != 0) {
                  commentDataIncrementor(comment)
                  createComment(postIdForComment, comment)
                }//if
              }}
            >
              <View style={{ marginHorizontal: 10 }}><CustomInput
                value={comment}
                placeholder={'Write a comment'}
                icon={true}
                onValueChange={(value) => setComment(value)}
              /></View>
            </TouchableOpacity>
          </Container>
        </View>
      </Modal>
    )
  }//coment modal
  ///////////////////////////////////////////////////////////////////////////////////
  const commentIncrementer = (postid) => {
    console.log('incrementor', postid)
    let array = [...latest]
    let array2 = [...popular]
    let array3 = [...myPosts]
    for (let i = 0; i < latest.length; i++) {
      if (latest[i].id == postid) {
        array[i].total_comments = +array[i].total_comments + 1
        setLatest(array)
      }
    }//for
    for (let i = 0; i < popular.length; i++) {
      if (popular[i].id == postid) {
        array2[i].total_comments = +array2[i].total_comments + 1
        setPopular(array2)
      }
    }//for
    for (let i = 0; i < myPosts.length; i++) {
      if (myPosts[i].id == postid) {
        array3[i].total_comments = +array3[i].total_comments + 1
        setMyPosts(array3)
      }
    }//for

  }//commentIncrementer

  //////////////////////////////////////////////////////////////////////////////
  const like = (post_id) => {
    let bodyFormData = new FormData();
    bodyFormData.append('post_id', post_id)
    client.post('/likes', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => console.log(response.data.message))
      .catch(error => console.log('error', error))
  }//like
  ///////////////////////////////////////////////////////////////////////
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  ///////////////////////////////////////////////////////////////////////
  const createReportApi = () => {
    setPostLoading(true)
    setPostLoading(false)
    setPostReportModal(false)
    setMenuVisible(false)
    let bodyFormData = new FormData();
    bodyFormData.append('text', reportDesc)
    bodyFormData.append('post_id', postIdForReport)
    bodyFormData.append('user_id', posterIdForReport)
    bodyFormData.append('email', Preference.get('email'))
    client.post('/ReportPost', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => {
        setReportDesc('')
        console.log(response.data.message)
        SimpleToast.show('Post is reported')
      })

      .catch(error => {
        setPostLoading(false)
        console.log('error', error)
      })
  }//like
  ///////////////////////////////////////////////////////////////////////
  const createCommentReportAPi = () => {
    setCommentReportModal(false)
    setReportMenuVisible(false)
    let bodyFormData = new FormData();
    bodyFormData.append('text', reportCommentDesc)
    bodyFormData.append('comment_id', commentIdForReport)
    bodyFormData.append('user_id', posterIdForReport)
    bodyFormData.append('email', Preference.get('email'))
    client.post('/ReportComment', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => {
        setReportCommentDesc('')
        console.log(response.data.message)
        SimpleToast.show('Comment is reported')
      })

      .catch(error => {
        setPostLoading(false)
        console.log('error', error)
      })
  }//createCommentReportAPi
  ///////////////////////////////////////////////////////////////////////
  const deleteCommentApi = () => {
    setReportMenuVisible(false)
    let bodyFormData = new FormData();
    bodyFormData.append('comment_id', commentIdForReport)
    client.post('/deleteComment', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => {
        setPostCreated(+postCreated + 1)
        setPostTotalComments(postTotalComments - 1)
        SimpleToast.show('Comment is deleted')

      })

      .catch(error => {
        console.log('error', error)
      })
  }//deleteCommentApi
  ///////////////////////////////////////////////////////////////////////
  const deletePostApi = () => {
    setMenuVisible(false)
    let bodyFormData = new FormData();
    bodyFormData.append('post_id', postIdForReport)
    client.post('/DeletePost', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).
      then((response) => {
        setPostCreated(+postCreated + 1)
        console.log(response.data.message)
        setPostCreated(+postCreated + 1)
        SimpleToast.show('Post is Deleted')
      })

      .catch(error => {
        setPostLoading(false)
        console.log('error', error)
      })
  }//delete
  ///////////////////////////////////////////////////////////////////////

  const createPostApi = () => {
    if (addPost && postDesc == '') {
      SimpleToast.show('Description is required')
    }
    else if (addPost && profileImage == '' && video == '' && videoLink == '') {
      SimpleToast.show('Please select image or video')
    }
    else if (addArticle && articleDesc == '') {

      SimpleToast.show('Article Description is required')
    }
    else if (addArticle && articleImage == '') {
      SimpleToast.show('Image is required')
    }

    else {
      SimpleToast.show('Post will be uploaded soon')
      setPostLoading(true)
      setAddPost(false)
      setAddArticle(false)
      setAddIcon(false)
      let bodyFormData = new FormData()
      if (profileImage != '') {
        bodyFormData.append('text', postDesc)
        bodyFormData.append('category', 1)
        bodyFormData.append('post_type', 2)
        for (let i = 0; i < profileImage.length; i++) {
          bodyFormData.append(`file[${i}]`, profileImage[i])
        }
        //bodyFormData.append('file', profileImage)
      }
      else if (video != '') {
        bodyFormData.append('text', postDesc)
        bodyFormData.append('category', 1)
        bodyFormData.append('post_type', 3)
        bodyFormData.append('file[0]', video)
      }
      else if (videoLink != '') {
        bodyFormData.append('text', postDesc)
        bodyFormData.append('category', 1)
        bodyFormData.append('post_type', 4)
        bodyFormData.append('link', videoLink)
      }
      else {
        bodyFormData.append('text', articleDesc)
        bodyFormData.append('category', 1)
        bodyFormData.append('post_type', 1)
        bodyFormData.append('file[0]', articleImage)
      }
      // console.log(JSON.stringify(bodyFormData))
      client.post('/CreatePost', bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      }).
        then((response) => {
          if (response.data.status === "Success") {
            SimpleToast.show('Post Created Successfully')
            setAddPost(false)
            setAddArticle(false)
            setAddIcon(false)
            setPostCreated(postCreated + 1)
            setProfileImage([])
            setArticleDesc('')
            setArticleImage('')
            setPostDesc('')
            setVideo('')
            setVideoLink('')
          }
          else {
            SimpleToast.show('Something went wrong with post!')
            console.log(response.data)
          }
          setPostLoading(false)
        }
        )
        .catch(error => {
          setPostLoading(false)
          console.log('error', error)
        })
    }//else
  }//createPost

  ////////////////////////////////////////////////////////////////////////

  const refresh = (viewtype) => {
    setRefreshing(true);
    homeDataApi(viewtype, 1)
  } //refresh

  const delayTime = (time) => {
    const timeAgo = moment(time).fromNow();
    return (<Text>{timeAgo}</Text>)
  }//delayTime
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const openPickerVideo = () => {
    const pickerOptions = {
      mediaType: 'video',
      videoQuality: 'medium',
      durationLimit: 30,
    };
    launchImageLibrary(pickerOptions, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("Error: ", response.errorMessage);
      }
      else {
        const source = {
          uri:
            Platform.OS === 'ios'
              ? 'File:///' + response.uri.split('file:/').join('')
              : response.uri,
          name: moment().format('x') + '.mp4',
          type: 'video/mp4'

        };
        setVideo(source)
        if (profileImage)
          setProfileImage([])
        if (videoLink)
          setVideoLink('')
      }
    });
  };
  ///////////////////////////////////////////////////////////////////////////

  const openPicker = () => {
    const pickerOptions = {
      quality: 0.2,
    };
    launchImageLibrary(pickerOptions, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("Error: ", response.errorMessage);
      } else {
        console.log('uro', response.uri)
        const source = {
          uri:
            Platform.OS === 'ios'
              ? 'File:///' + response.uri.split('file:/').join('')
              : response.uri,
          name: moment().format('x') + '.jpeg',
          type: 'image/jpeg',

        };
        if (addArticle) {
          setArticleImage(source)
        }//if
        else {
          let array = [...profileImage]
          array.push(source)
          setProfileImage(array)
          console.log('profile image', array)
          if (video) {
            setVideo('')
          }
          if (videoLink)
            setVideoLink('')
          // console.log("uploaded", response);
        }//else
      }
    });
  };
  ///////////////////////////////////////////////////////////////////////////
  const onShare = async (post_id) => {
    try {
      const result = await Share.share({
        message:
          `https://app.MI.life/HomeScreen/${post_id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }//onShare
  ///////////////////////////////////////////////////////////////////////////////////////
  const menuButton = (poster_id) => {
    console.log(Preference.get('user_id'), poster_id)
    return (
      <Modal
        animated
        animationType="slide"
        visible={isMenuVisible}
        transparent
        onRequestClose={() => setMenuVisible(false)}>
        {poster_id == Preference.get('user_id') ?
          <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: 1, justifyContent: 'flex-end', }}>
            <View style={{ backgroundColor: 'white', height: 80, paddingBottom: 20, paddingTop: 10 }}>
              <TouchableOpacity
                onPress={() => { setMenuVisible(false) }}
                style={{ position: 'absolute', right: 10, zIndex: 4 }}>
                <CancelIcon name="cross" size={30} color="#24bdaf" />
              </TouchableOpacity>
              {/* <View style={styles.menuModalText}>
                <EditIcon name="edit" size={30} color="#24bdaf" />
                <Text style={styles.menuItem}>Edit</Text>
              </View> */}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Delete Post",
                    "Are you sure you want to delete post.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => deletePostApi() }
                    ]
                  );
                }}
                style={styles.menuModalText}>
                <MaterialIcons name="delete-forever" size={30} color="#24bdaf" />
                <Text style={styles.menuItem}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: 1, justifyContent: 'flex-end', }}>
            <View style={{ backgroundColor: 'white', height: 80, paddingBottom: 20, paddingTop: 10 }}>
              <TouchableOpacity
                onPress={() => { setMenuVisible(false) }}
                style={{ position: 'absolute', right: 10, zIndex: 4 }}>
                <CancelIcon name="cross" size={30} color="#24bdaf" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPostReportModal(true)
                  setPosterIdForReport(poster_id)
                }}
                style={styles.menuModalText}>
                <MaterialIcons name="report" size={30} color="#24bdaf" />
                <Text style={styles.menuItem}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </Modal>
    );

  }//menu button
  ///////////////////////////////////////////////////////////////////////////////////////
  const reportMenuButton = (user_id) => {
    console.log(user_id, Preference.get('user_id'))
    return (
      <Modal
        animated
        animationType="slide"
        visible={isReportMenuVisible}
        transparent
        onRequestClose={() => setReportMenuVisible(false)}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: 1, justifyContent: 'flex-end', }}>
          <View style={{ backgroundColor: 'white', height: 80, paddingBottom: 20, paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() => { setReportMenuVisible(false) }}
              style={{ position: 'absolute', right: 10, zIndex: 4 }}>
              <CancelIcon name="cross" size={30} color="#24bdaf" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (user_id == Preference.get('user_id')) {
                  Alert.alert(
                    "Delete Comment",
                    "Are you sure you want to delete Comment.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "OK", onPress: () => {
                          setCommentData(commentData.filter((item) => { return item.id != commentIdForReport }))
                          deleteCommentApi()
                        }
                      }
                    ]
                  );
                }
                else
                  setCommentReportModal(true)
              }}
              style={styles.menuModalText}>
              <MaterialIcons name="report" size={30} color="#24bdaf" />
              <Text style={styles.menuItem}>{user_id == Preference.get('user_id') ? 'Delete' : 'Report'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );

  }// report menu button
  ///////////////////////////////////////////////////////////////////////////////////////
  const unSelectImage = (name) => {
    setProfileImage(profileImage.filter((item) => {
      return item.name != name
    }))
  }//unSelectImage
  //////////////////////////////////////////////////////////////////////////////////////
  const addPostModal = () => {
    //setAddIcon(false)
    return (
      <Modal
        visible={addPost}
        animationType="slide"
        transparent={true}
        onRequestClose={() => { setAddPost(false) }}
      >
        <View style={styles.modalComments}>
          <Container >
            <Header style={{ backgroundColor: 'white' }}>
              <Left>
                <TouchableOpacity
                  onPress={() => setAddPost(false)}
                >
                  <Icon name="chevron-back" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title style={{ color: '#24bdaf' }}>Create Post</Title>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    setAddPost(false)
                    setAddIcon(false)
                  }}
                  style={{ alignSelf: 'flex-end' }}>
                  <CancelIcon name="cross" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Right>
            </Header>

            <ScrollView style={{ flex: 1 }}>
              <Content>
                <View style={styles.userData}>
                  <View style={styles.postUserImage}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Preference.get('image') == null ? Images.palceHolder : { uri: Preference.get('image') }} />
                  </View>
                  <View style={styles.postUserName}>
                    <Text style={styles.postUserNameText}>{Preference.get('name')}</Text>
                  </View>
                </View>
                <View style={styles.postDesc}>

                  <TextInput
                    placeholder={'Enter your post description here'}
                    multiline={true}
                    value={postDesc}
                    onChangeText={(value) => setPostDesc(value)}
                    style={{ height: '100%', textAlignVertical: "top" }}
                  />
                </View>
                <View style={styles.postImageVideo}>
                  <TouchableOpacity
                    onPress={() => { openPicker() }}
                  >
                    <CancelIcon name="image" size={50} color="#24bdaf" />
                  </TouchableOpacity>
                  <View style={{ marginHorizontal: 10 }} />
                  <TouchableOpacity
                    onPress={() => { setVideoType(!videoType) }}
                  >
                    <CancelIcon name="video" size={50} color="#24bdaf" />
                  </TouchableOpacity>
                </View>

                {videoType ?
                  <View style={styles.videoOptions}>
                    <TouchableOpacity
                      onPress={() => openPickerVideo()}
                      style={styles.videoButton}
                    >
                      <Text style={styles.videoButtonText}>Select a video</Text>
                    </TouchableOpacity>
                    <Text style={styles.videoOptionar}>OR</Text>
                    <TextInput
                      placeholder={'Paste video link here'}
                      style={styles.videoLinkInput}
                      value={videoLink}
                      onChangeText={(val) => {
                        setVideo('')
                        setVideoLink(val)
                      }}
                    />
                  </View>
                  : null}
                {profileImage.length != 0 ?
                  <View style={styles.selectedImageContainer}>
                    {/* <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={profileImage[0]} /> */}
                    <FlatList
                      horizontal
                      // style={{ flex: 1 }}
                      data={profileImage}
                      keyExtractor={(item) => item.name.toString()}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <View style={styles.selectedImages}>
                              <Image style={{ width: '100%', height: '100%', }} source={item} />
                            </View>
                            <TouchableOpacity
                              onPress={() => { unSelectImage(item.name) }}
                              style={{ position: 'absolute', right: 8, }}>
                              <CancelIcon name="cross" size={30} color="#24bdaf" />
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    />

                    <View style={styles.selectedImage}>
                      <Image style={styles.menu} source={Icons.checkbox_tick} />
                      <Text style={styles.selectedImageText}>Image is Selected</Text>
                    </View>
                  </View>
                  : null}
                {video ?
                  <View style={styles.mainSelectedImage}>
                    <View style={styles.viewSelectedImage}>
                      <Video style={{ width: '100%', height: '100%', }}
                        source={video}
                        resizeMode={'cover'}
                        repeat={true}
                        paused={pausedVideo}
                        muted={true}
                      // onBuffer={this.onBuffer}
                      // onError={this.videoError}
                      />
                      <View style={styles.pausedIcon}>
                        <TouchableOpacity
                          style={styles.videobox}
                          onPress={() => { setPausedVideo(!pausedVideo) }}
                        >
                          {pausedVideo ? <MaterialIcons name="not-started" size={90} color="#24bdaf" /> : null}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { setVideo('') }}
                          style={{ position: 'absolute', right: 8, top: 8 }}>
                          <CancelIcon name="cross" size={30} color="#24bdaf" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.selectedImage}>
                      <Image style={styles.menu} source={Icons.checkbox_tick} />
                      <Text style={styles.selectedImageText}>Video is Selected</Text>
                    </View>
                  </View> : null}
                {videoLink ?
                  <View style={styles.selectedImageLink}>
                    <Image style={styles.menu} source={Icons.checkbox_tick} />
                    <Text style={styles.selectedImageText}>Video Link is Selected</Text>
                  </View> : null}
              </Content>
              <></>
              <Button
                title="Post"
                onPress={() => {
                  createPostApi()
                }}
                buttonStyle={styles.postButton}
                containerStyle={{ marginBottom: '2%' }}
                loading={postLoading ? true : false} />
            </ScrollView>
          </Container>
        </View>
      </Modal>
    )

  }//addPostModal
  ///////////////////////////////////////////////////////////////////////////////////////

  const addPostReport = () => {
    //setAddIcon(false)
    return (
      <Modal
        visible={postReportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setPostReportModal(false)
        }}
      >
        <View style={styles.modalComments}>
          <Container >
            <Header style={{ backgroundColor: 'white' }}>
              <Left>
                <TouchableOpacity
                  onPress={() => setPostReportModal(false)}
                >
                  <Icon name="chevron-back" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title style={{ color: '#24bdaf' }}>Report</Title>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    setPostReportModal(false)
                    setMenuVisible(false)
                  }}
                  style={{ alignSelf: 'flex-end' }}>
                  <CancelIcon name="cross" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Right>
            </Header>
            <ScrollView style={{ flex: 1 }}>
              <Content>
                <View style={styles.userData}>
                  <View style={styles.postUserImage}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Preference.get('image') == null ? Images.palceHolder : { uri: Preference.get('image') }} />
                  </View>
                  <View style={styles.postUserName}>
                    <Text style={styles.postUserNameText}>{Preference.get('name')}</Text>
                  </View>
                </View>
                <View style={styles.reportField}>

                  <TextInput
                    placeholder={'Write the reason why are you reporting this post.'}
                    multiline={true}
                    value={reportDesc}
                    onChangeText={(value) => setReportDesc(value)}
                    style={{ height: '100%', textAlignVertical: "top" }}
                  />
                </View>

              </Content>
              <></>
              <Button
                title="Report"
                onPress={() => {
                  createReportApi()
                }}
                buttonStyle={styles.postButton}
                containerStyle={{ marginBottom: '2%' }}
                loading={postLoading ? true : false} />
            </ScrollView>
          </Container>
        </View>
      </Modal>
    )

  }
  ///////////////////////////////////////////////////////////////////////////////////////
  const addArticleModal = () => {
    //setAddIcon(false)
    return (
      <Modal
        visible={addArticle}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setAddArticle(false)
        }}
      >
        <View style={styles.modalComments}>
          <Container >
            <Header style={{ backgroundColor: 'white' }}>
              <Left>
                <TouchableOpacity
                  onPress={() => setAddArticle(false)}
                >
                  <Icon name="chevron-back" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title style={{ color: '#24bdaf' }}>Create Article</Title>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    setAddIcon(false)
                    setAddArticle(false)
                  }}
                  style={{ alignSelf: 'flex-end' }}>
                  <CancelIcon name="cross" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Right>
            </Header>
            <ScrollView style={{ flex: 1 }}>
              <Content>
                <View style={styles.userData}>
                  <View style={styles.postUserImage}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Preference.get('image') == null ? Images.palceHolder : { uri: Preference.get('image') }} />
                  </View>
                  <View style={styles.postUserName}>
                    <Text style={styles.postUserNameText}>{Preference.get('name')}</Text>
                  </View>
                </View>
                <View style={styles.postDesc}>

                  <TextInput
                    placeholder={'Enter your article description here'}
                    multiline={true}
                    value={articleDesc}
                    onChangeText={(value) => setArticleDesc(value)}
                    style={{ height: '100%', textAlignVertical: "top" }}
                  />
                </View>
                <View style={styles.postImageVideo}>
                  <TouchableOpacity
                    onPress={() => { openPicker() }}
                  >
                    <CancelIcon name="image" size={50} color="#24bdaf" />
                  </TouchableOpacity>
                </View>

                {articleImage ?
                  <View style={styles.mainSelectedImage}>
                    <View style={styles.viewSelectedImage}>
                      <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={articleImage} />
                      <TouchableOpacity
                        onPress={() => { setArticleImage('') }}
                        style={{ position: 'absolute', right: 8, top: 8 }}>
                        <CancelIcon name="cross" size={30} color="#24bdaf" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.selectedImage}>
                      <Image style={styles.menu} source={Icons.checkbox_tick} />
                      <Text style={styles.selectedImageText}>Image is Selected</Text>
                    </View>
                  </View> : null}

              </Content>
              <></>
              <Button
                title="Post"
                onPress={() => {
                  createPostApi()
                }}
                buttonStyle={styles.postButton}
                containerStyle={{ marginBottom: '2%' }}
                loading={postLoading ? true : false} />

            </ScrollView>
          </Container>
        </View>
      </Modal>
    )

  }

  /////////////////////////////////////////////////////////////////////////////////////////
  const addCommentReport = () => {
    return (
      <Modal
        visible={commentReportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setCommentReportModal(false)
        }}
      >
        <View style={styles.modalComments}>
          <Container >
            <Header style={{ backgroundColor: 'white' }}>
              <Left>
                <TouchableOpacity
                  onPress={() => setCommentReportModal(false)}
                >
                  <Icon name="chevron-back" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title style={{ color: '#24bdaf' }}>Report Comment</Title>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    setCommentReportModal(false)
                    setReportMenuVisible(false)
                  }}
                  style={{ alignSelf: 'flex-end' }}>
                  <CancelIcon name="cross" size={30} color="#24bdaf" />
                </TouchableOpacity>
              </Right>
            </Header>
            <ScrollView style={{ flex: 1 }}>
              <Content>
                <View style={styles.userData}>
                  <View style={styles.postUserImage}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Preference.get('image') == null ? Images.palceHolder : { uri: Preference.get('image') }} />
                  </View>
                  <View style={styles.postUserName}>
                    <Text style={styles.postUserNameText}>{Preference.get('name')}</Text>
                  </View>
                </View>
                <View style={styles.reportField}>
                  <TextInput
                    placeholder={'Write the reason why are you reporting this post.'}
                    multiline={true}
                    value={reportCommentDesc}
                    onChangeText={(value) => setReportCommentDesc(value)}
                    style={{ height: '100%', textAlignVertical: "top" }}
                  />
                </View>
              </Content>
              <></>
              <Button
                title="Report"
                onPress={() => {
                  createCommentReportAPi()
                }}
                buttonStyle={styles.postButton}
                containerStyle={{ marginBottom: '2%' }}
                loading={postLoading ? true : false} />
            </ScrollView>
          </Container>
        </View>
      </Modal>
    )

  }

  /////////////////////////////////////////////////////////////////////////////////////////


  const addIconModal = () => {
    return (<Modal
      animated
      animationType="slide"
      visible={addIcon}
      transparent
      onRequestClose={() => setAddIcon(false)}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: 1, justifyContent: 'flex-end', }}>
        <View style={{ backgroundColor: 'white', height: 130, paddingBottom: 20, paddingTop: 10 }}>
          <TouchableOpacity
            onPress={() => { setAddIcon(false) }}
            style={{ position: 'absolute', right: 10, top: 5, zIndex: 4 }}>
            <CancelIcon name="cross" size={30} color="#24bdaf" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setAddPost(true) }}
            style={styles.menuModalText}>
            <EditIcon name="edit" size={20} color="#24bdaf" />
            <Text style={styles.menuItem}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuModalText}
            onPress={() => { setAddArticle(true) }}
          >
            <MaterialIcons name="article" size={23} color="#24bdaf" />
            <Text style={styles.menuItem}>Article</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    );

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ViewImageModal = () => {
    console.log('iage')
    return (
      <NativeModal
        isVisible={isImageVisible}
        animationInTiming={600}
        animationOutTiming={600}
        style={{ flex: 1, marginBottom: 0, marginHorizontal: 0, marginTop: '15%' }}
        onBackdropPress={setModalVisible}
      >

        <View style={{ flex: 1 }}>

        </View>
      </NativeModal>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <TopHeader
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        name={'news feeds'}
        rightIcon={Icons.bellIcon}
      />
      <View style={styles.container}>
        <View style={styles.tabWrapper}>
          <Text
            onPress={() => {
              setType('all')
              setTab(0)
            }
            }
            style={[
              styles.tab,
              tab == 0
                ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                : { backgroundColor: Colors.transparent },
            ]}>
            Latest

          </Text>

          <Text
            onPress={() => {
              setType('popular')
              setTab(1)
            }}
            style={[
              styles.tab,
              tab == 1
                ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                : { backgroundColor: Colors.transparent },
            ]}>
            Popular
          </Text>

          <Text
            onPress={() => {
              setType('my')
              setTab(2)
            }}
            style={[
              styles.tab,
              tab == 2
                ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                : { backgroundColor: Colors.transparent },
            ]}>
            My Posts
          </Text>
          <Text
            onPress={() => {
              setType('Friends')
              setTab(3)
            }}
            style={[
              styles.tab,
              tab == 3
                ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                : { backgroundColor: Colors.transparent },
            ]}>
            My Friends
          </Text>
        </View>
      </View>
      {fullLoading ?
        <View style={styles.fullLoading}>
          <ActivityIndicator size="large" color={Colors.cadetBlue} />
        </View>
        :
        null
      }
      {tab == 0 && <FlatList
        data={latest}
        keyExtractor={(item, index) => {
          (item.id + "" + index.toString())
        }}
        extraData={latest}
        refreshing={refreshing}
        onRefresh={() => refresh('all')}
        onEndReachedThreshold={0.4}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: Colors.background
        }}
        onEndReached={() => {
          console.log('PageCount',PageCount)
          let val = PageCount + 1
          if (PageCount <= totalPage) {
            setLoading(true)
            setPage(val)
            homeDataApi(type, val)
          }//nested if
          else {
            // SimpleToast.show('Nothing to show more')
          }//nested else
        }}
        keyExtractor={(item, index) => item.id + index.toString()
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.backroundContainer}>
              <View style={styles.firstRow}>
                <TouchableOpacity style={styles.profile} activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate('MemberTabs', { name: item.user.name, id: item.user.id, image: item.user.image })
                  }>
                  <View style={styles.dp}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />
                    <Image style={{ width: 20, height: 20, position: 'absolute', bottom: 2, right: 3 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.time}>{delayTime(item.created_at)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostIdForReport(item.id)
                    setMenuVisible(true)
                    setPostUserIdForReport(item.user.id)
                  }}
                  style={styles.menuWrapper}>
                  <Image style={styles.menu} source={Icons.menuIcon} />
                </TouchableOpacity>

              </View>
              <View>
                <SeeMore
                  styles={styles.articletDes}
                  styles2={[styles.articletDes, { color: '#24bdaf' }]}
                  item={item.text}
                />
              </View>
              {item.assets.length == 0 ? null :
                item.post_type == 4 ?
                  <View style={styles.linkText}>
                    <TouchableOpacity>
                      <Text style={styles.postLink}>
                        {item.assets[0].link}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  : item.post_type == 3 ?
                    <VideoPlayer
                      video={item.assets[0]}
                    />
                    :
                    <View
                      // onPress={() => {
                      //   ViewImageModal()
                      //   setIsImageVisible(true)
                      // }}
                      style={styles.mainImageWrapper}>

                      {item.assets.length != 0 ?
                        // <Image style={styles.mainImage} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                        <View style={styles.mainImage}>

                          <FlatList
                            pagingEnabled
                            horizontal
                            data={item.assets}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: itm, index }) => {

                              return (
                                <TouchableOpacity
                                  activeOpacity={1}
                                  onPress={() => props.navigation.navigate('FullImage', { data: item.assets, index })}>
                                  <Image style={styles.mainImage} source={{ uri: itm.link }} />

                                </TouchableOpacity>
                              )
                            }}
                          />
                        </View>
                        :
                        <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Images.palceHolder} />
                      }
                    </View>
              }
              <View style={styles.ReactBox}>
                <TouchableOpacity
                  onPress={() => {
                    like(item.id)
                    if (item.liked_by_logged_in_user) {
                      item.liked_by_logged_in_user = false
                      item.total_liks = +item.total_liks - 1
                    } else {
                      item.liked_by_logged_in_user = true
                      item.total_liks = +item.total_liks + 1
                    }
                    if (!countBool)
                      setCountBool(true);
                    else
                      setCountBool(false)
                  }}
                  style={styles.ReactWrapper}>

                  {item.liked_by_logged_in_user ? <Text style={styles.likedText}>
                    <Image style={styles.menu} source={Icons.likeIcon} /> {item.total_liks} Flutters</Text>
                    :
                    <Text style={{ color: 'grey' }}>
                      <Image style={styles.menu} source={Icons.unlikedIcon} /> {item.total_liks} Flutters</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare(item.id)}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.shareIcon} />
                  <Text style={{ color: 'grey' }}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostTotalComments(item.total_comments)
                    commentDataApi(item.id, 2)
                    setPostIdForComment(item.id)
                  }}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.commentIcon} />
                  <Text style={{ color: 'grey' }}>{item.total_comments} Comments</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (comment && comment.length != 0) {
                    setFullLoading(true)
                    createComment(item.id, comment)
                  }//if
                }}
              >
                <View style={{ margin: 10 }}>
                  <CustomInput
                    value={comment}
                    onValueChange={(value) => setComment(value)}
                    placeholder={'Write a comment'} icon={true} /></View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      }

      {tab == 1 && <FlatList
        data={popular}
        extraData={popular}
        refreshing={refreshing}
        onRefresh={() => refresh('popular')}
        onEndReachedThreshold={0.4}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: Colors.background
        }}
        onEndReached={() => {
          let val = PageCountPopular + 1
          if (PageCountPopular <= totalPagePopular) {
            setLoading(true)
            setPagePopular(val)
            homeDataApi(type, val)
          }//nested if
          else {
            // SimpleToast.show('Nothing to show more')
          }//nested else
        }}
        keyExtractor={(item, index) => {
          (item.id + "" + index.toString())
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.backroundContainer}>
              <View style={styles.firstRow}>
                <TouchableOpacity style={styles.profile} activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate('MemberTabs', { name: item.user.name, id: item.user.id, image: item.user.image })
                  }>
                  <View style={styles.dp}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />
                    <Image style={{ width: 20, height: 20, position: 'absolute', bottom: 2, right: 3 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.time}>{delayTime(item.created_at)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostIdForReport(item.id)
                    setMenuVisible(true)
                    setPostUserIdForReport(item.user.id)
                  }}
                  style={styles.menuWrapper}>
                  <Image style={styles.menu} source={Icons.menuIcon} />
                </TouchableOpacity>

              </View>
              <View>
                <SeeMore
                  styles={styles.articletDes}
                  styles2={[styles.articletDes, { color: '#24bdaf' }]}
                  item={item.text}
                />
              </View>
              {item.assets.length == 0 ? null :
                item.post_type == 4 ?
                  <View style={styles.linkText}>
                    <TouchableOpacity>
                      <Text style={styles.postLink}>
                        {item.assets[0].link}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  : item.post_type == 3 ?
                    <VideoPlayer
                      video={item.assets[0]}
                    />
                    :
                    <View
                      // onPress={() => {
                      //   ViewImageModal()
                      //   setIsImageVisible(true)
                      // }}
                      style={styles.mainImageWrapper}>

                      {item.assets.length != 0 ?
                        // <Image style={styles.mainImage} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                        <View style={styles.mainImage}>
                          {imageModal && <FullImageModal data={item.assets} setImageModalVisible={setImageModalVisible} imageModal={imageModal} />}

                          <FlatList
                            pagingEnabled
                            horizontal
                            data={item.assets}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: itm, index }) => {

                              return (
                                <TouchableOpacity
                                  activeOpacity={1}
                                  onPress={() => props.navigation.navigate('FullImage', { data: item.assets, index })}>
                                  <Image style={styles.mainImage} source={{ uri: itm.link }} />

                                </TouchableOpacity>
                              )
                            }}
                          />
                        </View>
                        :
                        <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Images.palceHolder} />
                      }
                    </View>
              }
              <View style={styles.ReactBox}>
                <TouchableOpacity
                  onPress={() => {
                    like(item.id)
                    if (item.liked_by_logged_in_user) {
                      item.liked_by_logged_in_user = false
                      item.total_liks = +item.total_liks - 1
                    } else {
                      item.liked_by_logged_in_user = true
                      item.total_liks = +item.total_liks + 1
                    }
                    if (!countBool)
                      setCountBool(true);
                    else
                      setCountBool(false)
                  }}
                  style={styles.ReactWrapper}>
                  {item.liked_by_logged_in_user ? <Text style={styles.likedText}>
                    <Image style={styles.menu} source={Icons.likeIcon} /> {item.total_liks} Flutters</Text>
                    :
                    <Text style={{ color: 'grey' }}>
                      <Image style={styles.menu} source={Icons.unlikedIcon} /> {item.total_liks} Flutters</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare(item.id)}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.shareIcon} />
                  <Text style={{ color: 'grey' }}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostTotalComments(item.total_comments)
                    commentDataApi(item.id, 2)
                    setPostIdForComment(item.id)
                  }}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.commentIcon} />
                  <Text style={{ color: 'grey' }}>{item.total_comments} Comment</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (comment && comment.length != 0) {
                    setFullLoading(true)
                    createComment(item.id, comment)
                  }//if
                }}
              >
                <View style={{ margin: 10 }}>
                  <CustomInput
                    value={comment}
                    onValueChange={(value) => setComment(value)}
                    placeholder={'Write a comment'} icon={true} /></View>
              </TouchableOpacity>

            </View>
          );
        }}
      />}



      {tab == 2 && <FlatList
        data={myPosts}
        extraData={myPosts}
        refreshing={refreshing}
        onRefresh={() => refresh('my')}
        onEndReachedThreshold={0.4}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: Colors.background
        }}
        onEndReached={() => {
          let val = PageCountMy + 1
          if (PageCountMy <= totalPageMy) {
            setLoading(true)
            setPageMy(val)
            homeDataApi(type, val)
          }//nested if
          else {
            // SimpleToast.show('Nothing to show more')
          }//nested else
        }}
        keyExtractor={(item, index) => {
          (item.id + "" + index.toString())
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.backroundContainer}>
              <View style={styles.firstRow}>
                <TouchableOpacity style={styles.profile} activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate('MemberTabs', { name: item.user.name, id: item.user.id, image: item.user.image })
                  }>
                  <View style={styles.dp}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />
                    <Image style={{ width: 20, height: 20, position: 'absolute', bottom: 2, right: 3 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.time}>{delayTime(item.created_at)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostIdForReport(item.id)
                    setMenuVisible(true)
                    setPostUserIdForReport(item.user.id)
                  }}
                  style={styles.menuWrapper}>
                  <Image style={styles.menu} source={Icons.menuIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <SeeMore
                  styles={styles.articletDes}
                  styles2={[styles.articletDes, { color: '#24bdaf' }]}
                  item={item.text}
                />

              </View>
              {item.assets.length == 0 ? null :
                item.post_type == 4 ?
                  <View style={styles.linkText}>
                    <TouchableOpacity>
                      <Text style={styles.postLink}>
                        {item.assets[0].link}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  : item.post_type == 3 ?
                    <VideoPlayer
                      video={item.assets[0]}
                    />
                    :
                    <View
                      // onPress={() => {
                      //   ViewImageModal()
                      //   setIsImageVisible(true)
                      // }}
                      style={styles.mainImageWrapper}>

                      {item.assets.length != 0 ?
                        // <Image style={styles.mainImage} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                        <View style={styles.mainImage}>
                          {imageModal && <FullImageModal data={item.assets} setImageModalVisible={setImageModalVisible} imageModal={imageModal} />}

                          <FlatList
                            pagingEnabled
                            horizontal
                            data={item.assets}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: itm, index }) => {

                              return (
                                <TouchableOpacity
                                  activeOpacity={1}
                                  onPress={() => props.navigation.navigate('FullImage', { data: item.assets, index })}>
                                  <Image style={styles.mainImage} source={{ uri: itm.link }} />
                                </TouchableOpacity>
                              )
                            }}
                          />
                        </View>
                        :
                        <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Images.palceHolder} />
                      }
                    </View>
              }
              <View style={styles.ReactBox}>
                <TouchableOpacity
                  onPress={() => {
                    like(item.id)
                    if (item.liked_by_logged_in_user) {
                      item.liked_by_logged_in_user = false
                      item.total_liks = +item.total_liks - 1
                    } else {
                      item.liked_by_logged_in_user = true
                      item.total_liks = +item.total_liks + 1
                    }
                    if (!countBool)
                      setCountBool(true);
                    else
                      setCountBool(false)
                  }}
                  style={styles.ReactWrapper}>
                  {item.liked_by_logged_in_user ? <Text style={styles.likedText}>
                    <Image style={styles.menu} source={Icons.likeIcon} /> {item.total_liks} Flutters</Text>
                    :
                    <Text style={{ color: 'grey' }}>
                      <Image style={styles.menu} source={Icons.unlikedIcon} /> {item.total_liks} Flutters</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare(item.id)}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.shareIcon} />
                  <Text style={{ color: 'grey' }}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostTotalComments(item.total_comments)
                    commentDataApi(item.id, 2)
                    setPostIdForComment(item.id)
                  }}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.commentIcon} />
                  <Text style={{ color: 'grey' }}>{item.total_comments} Comment</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (comment && comment.length != 0) {
                    setFullLoading(true)
                    createComment(item.id, comment)
                  }//if
                }}
              >
                <View style={{ margin: 10 }}>
                  <CustomInput
                    value={comment}
                    onValueChange={(value) => setComment(value)}
                    placeholder={'Write a comment'} icon={true} /></View>
              </TouchableOpacity>

            </View>
          );
        }}
      />
      }
      {tab == 3 && <FlatList
        data={myPosts}
        extraData={myPosts}
        refreshing={refreshing}
        onRefresh={() => refresh('my')}
        onEndReachedThreshold={0.4}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: Colors.background
        }}
        onEndReached={() => {
          let val = PageCountMy + 1
          if (PageCountMy <= totalPageMy) {
            setLoading(true)
            setPageMy(val)
            homeDataApi(type, val)
          }//nested if
          else {
            // SimpleToast.show('Nothing to show more')
          }//nested else
        }}
        keyExtractor={(item, index) => {
          (item.id + "" + index.toString())
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.backroundContainer}>
              <View style={styles.firstRow}>
                <TouchableOpacity style={styles.profile} activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate('MemberTabs', { name: item.user.name, id: item.user.id, image: item.user.image })
                  }>
                  <View style={styles.dp}>
                    <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />
                    <Image style={{ width: 20, height: 20, position: 'absolute', bottom: 2, right: 3 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.time}>{delayTime(item.created_at)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostIdForReport(item.id)
                    setMenuVisible(true)
                    setPostUserIdForReport(item.user.id)
                  }}
                  style={styles.menuWrapper}>
                  <Image style={styles.menu} source={Icons.menuIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <SeeMore
                  styles={styles.articletDes}
                  styles2={[styles.articletDes, { color: '#24bdaf' }]}
                  item={item.text}
                />

              </View>
              {item.assets.length == 0 ? null :
                item.post_type == 4 ?
                  <View style={styles.linkText}>
                    <TouchableOpacity>
                      <Text style={styles.postLink}>
                        {item.assets[0].link}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  : item.post_type == 3 ?
                    <VideoPlayer
                      video={item.assets[0]}
                    />
                    :
                    <View
                      // onPress={() => {
                      //   ViewImageModal()
                      //   setIsImageVisible(true)
                      // }}
                      style={styles.mainImageWrapper}>

                      {item.assets.length != 0 ?
                        // <Image style={styles.mainImage} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                        <View style={styles.mainImage}>
                          {imageModal && <FullImageModal data={item.assets} setImageModalVisible={setImageModalVisible} imageModal={imageModal} />}

                          <FlatList
                            pagingEnabled
                            horizontal
                            data={item.assets}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: itm, index }) => {

                              return (
                                <TouchableOpacity
                                  activeOpacity={1}
                                  onPress={() => props.navigation.navigate('FullImage', { data: item.assets, index })}>
                                  <Image style={styles.mainImage} source={{ uri: itm.link }} />
                                </TouchableOpacity>
                              )
                            }}
                          />
                        </View>
                        :
                        <Image style={{ width: '100%', height: '100%', borderWidth: 1 }} source={Images.palceHolder} />
                      }
                    </View>
              }
              <View style={styles.ReactBox}>
                <TouchableOpacity
                  onPress={() => {
                    like(item.id)
                    if (item.liked_by_logged_in_user) {
                      item.liked_by_logged_in_user = false
                      item.total_liks = +item.total_liks - 1
                    } else {
                      item.liked_by_logged_in_user = true
                      item.total_liks = +item.total_liks + 1
                    }
                    if (!countBool)
                      setCountBool(true);
                    else
                      setCountBool(false)
                  }}
                  style={styles.ReactWrapper}>
                  {item.liked_by_logged_in_user ? <Text style={styles.likedText}>
                    <Image style={styles.menu} source={Icons.likeIcon} /> {item.total_liks} Flutters</Text>
                    :
                    <Text style={{ color: 'grey' }}>
                      <Image style={styles.menu} source={Icons.unlikedIcon} /> {item.total_liks} Flutters</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare(item.id)}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.shareIcon} />
                  <Text style={{ color: 'grey' }}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPostTotalComments(item.total_comments)
                    commentDataApi(item.id, 2)
                    setPostIdForComment(item.id)
                  }}
                  style={styles.ReactWrapper}>
                  <Image style={styles.menu} source={Icons.commentIcon} />
                  <Text style={{ color: 'grey' }}>{item.total_comments} Comment</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (comment && comment.length != 0) {
                    setFullLoading(true)
                    createComment(item.id, comment)
                  }//if
                }}
              >
                <View style={{ margin: 10 }}>
                  <CustomInput
                    value={comment}
                    onValueChange={(value) => setComment(value)}
                    placeholder={'Write a comment'} icon={true} /></View>
              </TouchableOpacity>

            </View>
          );
        }}
      />
      }


      <TouchableOpacity style={styles.addView}
        onPress={() => { setAddIcon(true) }}
      >
        <Image style={styles.addImg} source={img.addIcon} />
      </TouchableOpacity>
      {addIcon ? addIconModal() : null}
      {isModalVisible ? commentModal() : null}
      {addPost ? addPostModal() : null}
      {addArticle ? addArticleModal() : null}
      {postReportModal ? addPostReport() : null}
      {loading ? <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Colors.cadetBlue} />
      </View> :
        null
      }
      {isMenuVisible ? postUserIdForReport != -1 ? menuButton(postUserIdForReport) : null : null}
      {isReportMenuVisible ? reportMenuButton(posterIdForReport) : null}
      {commentReportModal ? addCommentReport() : null}
      {isImageVisible ? ViewImageModal() : null}

      {/* {endPageText?
          <Text style={{textAlign:'center'}}>Nothing to show more</Text>:null} */}
    </View>
  );
}
export default home;
