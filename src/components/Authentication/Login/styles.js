/* eslint-disable */
import {StyleSheet} from 'react-native';
import {theme} from '../../../globals/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.colors.primary,
  },
  input: {
    width:'90%',
    marginTop: 30,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    marginLeft:'auto',
    marginRight:'auto',
    color: '#ffffff',
    fontSize: 18,
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    marginTop: 40,
    backgroundColor: theme.colors.primary,
    height: 50,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.bg,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})
