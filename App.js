// import React, { useState, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// // Importação do componente CameraView e hooks do pacote expo-camera
// import { CameraView, useCameraPermissions } from 'expo-camera';

// export default function CameraScreen(){
//   // Hook do Expo para verificar e pedir permissões de câmera
//   const [permission, requestPermission] = useCameraPermissions();
//   // Estado para armazenar a foto tirada (URI da imagem salva temporariamente)
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   // Referência para o componente CameraView para acionar a captura de foto
//   const cameraRef = useRef(null);

//   // Se o estado da permissão ainda está carregando
//   if (!permission) {
//     return <View />;
//   }

//   // Se a permissão não foi concedida pelo usuário
//   if (!permission.granted) {
//     return (
//       <View style={styles.permissionContainer}>
//         <Text style={styles.permissionText}>Precisamos da sua permissão para abrir a câmera</Text>
//         <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
//           <Text style={styles.buttonText}>Conceder Permissão</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Função para capturar a fotografia
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       // Executa o método de captura e retorna um objeto contendo a URI da foto
//       const photo = await cameraRef.current.takePictureAsync();
//       setCapturedPhoto(photo.uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Se houver foto capturada, exibe o preview dela */}
//       {capturedPhoto ? (
//         <View style={styles.previewContainer}>
//           <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
//           <TouchableOpacity style={styles.retryButton} onPress={() => setCapturedPhoto(null)}>
//             <Text style={styles.buttonText}>Tirar Outra Foto</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         /* Caso contrário, renderiza o visor da câmera em tempo real */
//         <CameraView style={styles.camera} ref={cameraRef} facing="back">
//           <View style={styles.actionContainer}>
//             <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//               <View style={styles.captureInnerCircle} />
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   permissionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   permissionText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#1F2937',
//   },
//   permissionButton: {
//     backgroundColor: '#2563EB',
//     padding: 12,
//     borderRadius: 8,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   actionContainer: {
//     paddingBottom: 40,
//     alignItems: 'center',
//   },
//   captureButton: {
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     borderWidth: 4,
//     borderColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   captureInnerCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#FFFFFF',
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: '80%',
//     resizeMode: 'contain',
//   },
//   retryButton: {
//     backgroundColor: '#DC2626',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function GpsScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
     
  }
}