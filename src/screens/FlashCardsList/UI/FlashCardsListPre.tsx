import { FC } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Button,
} from 'react-native';
import { RenderItem } from '../Components/RenderItem';
import { FlashCardsDef } from '../../../atom/FlashCardsDataState';
import SelectDropdown from 'react-native-select-dropdown'

interface FlashCardsListPreProps {
  rows: FlashCardsDef[][];
  onPressCard: (id: number) => void;
	onPressButton: () => void;
	sortByName: () => void;
}

/**
 * 単語帳一覧のUI
 */
export const FlashCardsListPre: FC<FlashCardsListPreProps> = ({
	rows,
	onPressCard,
	onPressButton,
	sortByName,
}) => {
	return rows.length > 0 ? (
		<ScrollView
			contentContainerStyle={styles.ScrollContainer}
			showsVerticalScrollIndicator={false}
		>
			{/* 並び替え */}
			<SelectDropdown
				data={['名前順']}
				defaultButtonText={'並び替え'}
				onSelect={(selectedItem, index) => {
					// 今は名前順しかないので、名前順に並び替える
					sortByName();
				}}
				buttonStyle={styles.sortButton}
				buttonTextStyle={styles.sortButtonText}
			/>

			{rows.map((row, index) => (
				<View key={index} style={styles.row}>
					{row.map((item) => (
						<RenderItem
							key={item.id}
							id={item.id}
							name={item.name}
							onPressCard={onPressCard}
						/>
					))}
					{
						// 1の場合は空のやつを表示
						row.length === 1 && <RenderItem id={-1} name="" />
					}
				</View>
			))}
		</ScrollView>
	) : (
		<View style={styles.container}>
			<Text style={styles.heading}>単語帳はありません</Text>
			<TouchableOpacity style={styles.button} onPress={onPressButton}>
				<Text style={styles.buttonText}>単語帳を作成する</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
	heading: {
		fontSize: 20,
		fontWeight: '700',
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 5,
		backgroundColor: '#79BC6E',
	},
	buttonText: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
	},
	ScrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
	},
	sortButton: {
		alignSelf: 'flex-end',
		width: 100,
		height: 20,
		borderRadius: 10,
		marginTop: 3,
		borderWidth: 1,
		borderColor: 'black',
	},
	sortButtonText: {
		fontSize: 12,
	},
});
