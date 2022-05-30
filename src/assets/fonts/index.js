/*
TextaAlt-Black
TextaAlt-Bold
TextaAlt-BlackIt
TextaAlt-Heavy
TextaAlt-Regular
Texta-ThintIt
Texta-Medium
Texta-MediumIt
Texta-Bold
Texta-Light
Texta-LightIt
Texta-BoldIt
Texta-Thin
Texta-Regular
Texta-It
Texta-HeavyIt
Texta-Book
Texta-BookIt
Texta-BlackIt

*/

import { Platform } from "react-native";

const DEFAULT = {
    Al_Mushaf: 'Al_Mushaf',
    WorkSans:'WorkSans-ExtraBold',
};

const FONT_ANDROID = {
    Al_Mushaf: 'Al_Mushaf',
    WorkSans:'WorkSans-ExtraBold',
};

const AppFonts = Platform.select({
    ios: DEFAULT,
    android:  FONT_ANDROID
})

export default AppFonts;