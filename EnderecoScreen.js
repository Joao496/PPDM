import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';


function InfoField(props) {
  return (
    <View style={styles.caixaCampo}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.campo}
        value={props.value}
        editable={false}
      />
    </View>
  );
}

export default function EnderecoScreen() {
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [altitude, setAltitude] = useState(null);

  
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState('');

  async function pegarLocalizacaoEEndereco() {
    setCarregando(true);
    setMensagemErro('');

    try {
     
      const permissao = await Location.requestForegroundPermissionsAsync();

      if (permissao.status !== 'granted') {
        setMensagemErro('Você precisa permitir o acesso à localização.');
        setCarregando(false);
        return;
      }

      
      const posicao = await Location.getCurrentPositionAsync({});

      setLatitude(posicao.coords.latitude);
      setLongitude(posicao.coords.longitude);
      setAltitude(posicao.coords.altitude);


      const enderecos = await Location.reverseGeocodeAsync({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      });

      if (enderecos.length > 0) {
        const endereco = enderecos[0];

        setRua(endereco.street ?? 'Não encontrado');
        setNumero(endereco.streetNumber ?? 'S/N');
        setBairro(endereco.district ?? 'Não encontrado');
        setCep(endereco.postalCode ?? 'Não encontrado');
        setCidade(endereco.city ?? 'Não encontrado');
        setEstado(endereco.region ?? 'Não encontrado');
      } else {
        setMensagemErro('Não encontrei um endereço para essa localização.');
      }
    } catch (erro) {
      console.log('Erro ao buscar localização:', erro);
      setMensagemErro('Ocorreu um erro ao buscar sua localização. Tente novamente.');
    }

    setCarregando(false);
  }

  useEffect(() => {
    pegarLocalizacaoEEndereco();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Buscando sua localização...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.titulo}>Meu Endereço</Text>

      {mensagemErro !== '' && (
        <Text style={styles.textoErro}>{mensagemErro}</Text>
      )}

      {latitude !== null && (
        <View style={styles.blocoCoordenadas}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          <Text>Altitude: {altitude !== null ? altitude + ' m' : 'não disponível'}</Text>
        </View>
      )}

      <InfoField label="Rua" value={rua} />
      <InfoField label="Número (aproximado)" value={numero} />
      <InfoField label="Bairro" value={bairro} />
      <InfoField label="CEP" value={cep} />
      <InfoField label="Cidade" value={cidade} />
      <InfoField label="Estado" value={estado} />

      <TouchableOpacity style={styles.botao} onPress={pegarLocalizacaoEEndereco}>
        <Text style={styles.textoBotao}>Atualizar localização</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    padding: 16,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textoErro: {
    color: 'red',
    marginBottom: 10,
  },
  blocoCoordenadas: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  caixaCampo: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  campo: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 8,
    fontSize: 15,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
