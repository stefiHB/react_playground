import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MediaMeta from 'react-native-media-meta';


import Colors from "../../constants/Colors";

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5
        });
        console.log(image)
        MediaMeta.get(image)
            .then(metadata => console.log(metadata))
            .catch(err => console.error(err));
        if (!image.cancelled) {
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
    };

    const selectImage  = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        console.log(image)
        MediaMeta.get(image)
            .then(metadata => console.log(metadata))
            .catch(err => console.error(err));
        if (!image.cancelled) {
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
            </View>
            <View style={styles.buttonsContainer}>
            <Button
                style={styles.button}
                title="Select Image"
                color={Colors.primary}
                onPress={selectImage}
            />
            <Button
                style={styles.button}
                title="Take Image"
                color={Colors.primary}
                onPress={takeImageHandler}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonsContainer:{
        flexDirection: "row",
        width: '100%',
        justifyContent:'space-between'
    },
    button:{
        marginLeft: '20%',
        width: '60%',
    }
});

export default ImgPicker;
