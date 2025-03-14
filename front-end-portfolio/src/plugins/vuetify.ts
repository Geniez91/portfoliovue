/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { VDateInput } from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides


const lightTheme:ThemeDefinition ={
  dark: false,
  colors: {
    background: 'linear-gradient( #F5F5F5, #0E67ED);',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#000000',
    'navbar': '#FFFFFF',
    secondary: '#39B8B1',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'card':'#FFFFFF'
}
}

const darkTheme:ThemeDefinition={
  dark: true,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#E0E0E0',
    'navbar': '#333333',
    secondary: '#090B16',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'card':'575757'
}
}

export default createVuetify({
  components:{VNumberInput,VDateInput},
  theme: {
    defaultTheme: 'light',
themes:{
  light:lightTheme,
  dark:darkTheme
}
  },
})
