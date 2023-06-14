
import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import users from '../../mocks/users';

export default function Login({ navigation }) {

    const [username, setUsername] = new useState('cliente1');
    const [password, setPassword] = new useState('1234');

    useEffect(() => {
        async function carregarUser() {
            try {
                const user = await AsyncStorage.getItem('user')
                if (user !== null) {
                    navigation.navigate('Routes');
                }
            } catch (error) {
                console.error(error);
            }
        }
        carregarUser();
    }, []);

    async function saveUser() {
        try {
            const user = { username: username }
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = () => {
        users.forEach(user => {
            if (username === user.username) {
                if (password === user.password) {
                    saveUser();
                    navigation.navigate('Routes');
                } else {
                    alert('Senha incorreta!');
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/splash.png')} style={styles.imageBackground}>
            </ImageBackground>
            <View style={styles.container}>
                <Text style={styles.text}>Entre com seu login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Text style={styles.text}>Sua senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}
