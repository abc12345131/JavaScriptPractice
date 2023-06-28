import { StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/stylesKits'
import colors from '../../constants/colors';

export default StyleSheet.create({
  view: {
    flex: 1,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: pxToDp(25),
    color: colors.text,
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: pxToDp(200),
  }
});
