import { StyleSheet } from 'react-native';
import Colors from './../../../utils/colors'
export const styles = StyleSheet.create({
    safeStyle: {
        flex: 1,
    },
    CreateProfileText: {
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20
    },
    YourSelfText: {
        textAlign: "center"
    },
    dropdown: {
        borderColor: 'grey',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    cross: {
        position: 'absolute',
        right: -5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        zIndex: 12
    },
    PlaceHolderStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: "cover",
        alignSelf: "center"
    },
    PlaceholderView: {
        height: 150,
        justifyContent: "center"
    },
    CameraIcon: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end'
    },
    modalStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        // backgroundColor: '#00000000'
    },
});
