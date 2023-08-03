import { FC, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { FlashCardsDataState } from '../../../atom/FlashCardsDataState';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
interface RenderItemProps {
	id: number;
	name: string;
	onPressCard?: (id: number) => void;
}
// 単語帳のコンポーネント
export const RenderItem: FC<RenderItemProps> = ({ id, name, onPressCard }) => {
	const setData = useSetRecoilState(FlashCardsDataState);
	const [modalVisible, setModalVisible] = useState(false);

	const showModal = () => {
		setModalVisible(true);
	};
	const hideModal = () => {
		setModalVisible(false);
	};

	const deleteFlashCards = () => {
		Alert.alert('確認', `本当に単語帳「${name}」を削除しますか？`, [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					setData((prev) => prev.filter((item) => item.id !== id));
					Toast.show({
						text1: `単語帳「${name}」を削除しました`,
						type: 'error',
						visibilityTime: 2000,
					});

				},
			},
		]);
	};
	return id > -1 && onPressCard ? (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() => onPressCard(id)}
		>
			{/* 削除ボタンをモーダルで表示 */}
			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={hideModal}
			>
				<TouchableWithoutFeedback onPress={hideModal}>
					<View style={styles.modalContainer}>
						{/* ここにモーダルの内容を追加 */}
						<TouchableOpacity onPress={() => { hideModal(); deleteFlashCards(); }}>
							<View style={styles.modalContent}>
								<Text
									style={{
										color: 'red',
									}}
								>削除</Text>
							</View>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<TouchableOpacity
				style={styles.itemSettingButton}
				onPress={showModal}
			>
				<SimpleLineIcons name="options" />
			</TouchableOpacity>
			< Text > {name}</Text>
		</TouchableOpacity >
	) : (
		<View style={{ ...styles.itemContainer, opacity: 0 }}></View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 8,
		marginHorizontal: 8, // アイテム間のマージンを追加
		flex: 0.5,
		height: 90,
		backgroundColor: '#D9D9D9',
		position: 'relative',
		// 単語帳に影を追加
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.5,
		// Android用の影
		elevation: 5,
	},
	itemSettingButton: {
		// container の右上に配置
		position: 'absolute',
		top: 0,
		right: 0,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	modalContainer: {
		flex: 1,
		// 下の方に配置
		justifyContent: 'flex-end',
		paddingBottom: 100,
		// 背景を暗くする
		backgroundColor: 'rgba(0,0,0,.5)',
	},
	modalContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
});
