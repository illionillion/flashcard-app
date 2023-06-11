import { FC } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

interface SettingPreProps {
  apiKey: string;
  handleChangeText: (text: string) => void
  handlePrivacyPolicyButtonPress: () => void
  handleExplanationSettingButtonPress: () => void
}
/**
 * 設定画面のUI
 */
export const SettingPre: FC<SettingPreProps> = ({ apiKey, handleChangeText, handleExplanationSettingButtonPress, handlePrivacyPolicyButtonPress }) => {

	return (
		<View style={styles.allView}>
			<TextInput
				style={styles.input}
				placeholder="APIキー設定を入力"
				value={apiKey}
				onChangeText={handleChangeText}
				keyboardType="visible-password"
			/>
			<View style={styles.textView}>
				<TouchableOpacity onPress={handleExplanationSettingButtonPress} style={{ padding: 10 }}>
					<Text style={styles.text}>APIキーの取得方法</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handlePrivacyPolicyButtonPress} style={{ padding: 10 }}>
					<Text style={styles.text}>プライバシーポリシー</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	allView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 15,
	},
	input:{
		height: 40, 
		width: 336, 
		paddingHorizontal: 22,
		borderWidth: 1, 
		borderColor:'grey', 
		marginBottom: 10, 
		borderRadius:5,
	},
	textView: {
		alignSelf: 'flex-end',
		marginRight: 20,
	},
	text: {
		color: '#06C3FF',
		textDecorationLine: 'underline',
		textAlign: 'right',
	},
});
