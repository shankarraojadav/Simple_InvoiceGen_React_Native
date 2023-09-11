import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Picker} from '@react-native-picker/picker';
  import dateFormat from 'dateformat';
 import { PdfCode } from '../component/PdfCode';
  import * as Print from 'expo-print';
  import { shareAsync } from 'expo-sharing';
  
  export default function CreateBill() {
    const [name, set_Name] = useState('');
    const [Address, Set_Address] = useState('');
    const [Mobile_No, Set_Mobile_No] = useState('');
    const [Quantity, setQuantity] = useState('');
    const now = new Date();
    const [Invoice, setInvoice] = useState(dateFormat(now, 'ddmmyyhhMss'));
    const [Product, Set_Product] = useState('मुरुम');
    const [Total, setTotal] = useState('');
    const [ReceivedBalance, SetReceivedBalance] = useState('');
    const [PaymentType, setPaymentType] = useState('Credit');
    const [RemaningBalance, setRemaningBalance] = useState('Paid');
    const [selectedPrinter, setSelectedPrinter] = React.useState();
  
    const PrintToPdf =async () => {
      let html = PdfCode(
        name,
        Address,
        Mobile_No,
        Quantity,
        Invoice,
        Product,
        Total,
        ReceivedBalance,
        PaymentType,
        RemaningBalance,
      );
  
      try{
          const { uri } = await Print.printToFileAsync({
            html
          });
          console.log('File has been saved to:', uri);
          await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    
          set_Name('');
          setInvoice(dateFormat(now, "ddmmyyhhMss"));
          setTotal('');
          setQuantity('');
          SetReceivedBalance('');
          Set_Address('');
          Set_Mobile_No('');
          
    
        }catch(err){
            Alert.alert("Make shure You have Internet Connection or contact @+91 8530730017");
        }
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={name}
              onChangeText={text => set_Name(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}> Address: </Text>
            <TextInput
              style={styles.textInput}
              value={Address}
              placeholder="Address"
              onChangeText={text => Set_Address(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Mobile No: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={Mobile_No}
              placeholder="Mobile Num..."
              onChangeText={text => Set_Mobile_No(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Product:</Text>
            <View style={styles.PickerContainer}>
              <Picker
                selectedValue={Product}
                style={styles.Picker}
                onValueChange={(item, index) => Set_Product(item)}>
                <Picker.Item label="BMW" value={'BMW'} />
                <Picker.Item label="BENZ" value={'BENZ'} />
                <Picker.Item label="AUDI" value={'AUDI'} />
                <Picker.Item label="ROLLS ROYCE" value={'ROLLS ROYCE'} />
              </Picker>
            </View>
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Qty: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Quantity"
              value={Quantity}
              onChangeText={text => setQuantity(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Invoice No: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={Invoice}
              onChangeText={text => setInvoice(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Total: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Total"
              value={Total}
              onChangeText={text => setTotal(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Recived Amt: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Recived Amt"
              value={ReceivedBalance}
              onChangeText={text => SetReceivedBalance(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.text}>Remaining Balt: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Remaining Balance"
              value={RemaningBalance}
              onChangeText={text => setRemaningBalance(text)}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text>Payment Method : </Text>
            <View style={styles.PickerContainer}>
              <Picker
                selectedValue={PaymentType}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentType(itemValue)
                }>
                {/* 'ग्रिट (Grit)','दगड','Crash Sand','Plaster Sand' */}
                <Picker.Item label="Credit" value="Credit" />
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
          <View style={styles.createInvoiceButton}>
            <Button
              onPress={PrintToPdf}
              title="Create Invoice"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    InputContainer: {
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
    },
  
    textInput: {
      marginTop: 4,
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 4,
      padding: 4,
      marginBottom: 6,
      width: 350,
    },
  
    text: {
      fontWeight: '700',
    },
  
    PickerContainer: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 4,
      height: 50,
    },
    createInvoiceButton: {
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
    },
  });
  