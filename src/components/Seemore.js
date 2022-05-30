import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, } from 'react-native';


const SeeMore = ({
    styles,
    styles2,
    item,
    
}) => {
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);

    const toggleTextShown = () => {
        setTextShown(!textShown);
    };

    useEffect(() => {
        setNumLines(textShown ? undefined : 3);
    }, [textShown]);

    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 3 && !textShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [textShown],
    );

    return (
        <View>
            <Text onTextLayout={onTextLayout}
                numberOfLines={numLines}
                style={styles}
                ellipsizeMode="tail">
                {item}
            </Text>

            {showMoreButton ? (
                <Text onPress={toggleTextShown} style={styles2}>
                    {textShown ? 'Read Less' : 'Read More'}
                </Text>
            ) : null}
        </View>
    );
}

export default SeeMore;
