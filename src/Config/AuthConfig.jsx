import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

I18n.putVocabularies(translations);
I18n.setLanguage('pl');
/*
I18n.putVocabularies({
  pl: {
    'Sign In': 'Zaloguj',
    'Sign Up': "Rejestracja",
    'Reset Password': 'Odnawianie Hasła',
  },
});

console.log(translations)

export const signUpConfig = {
    hiddenDefaults: [
        'phone_number',
        'email'
    ],
};
*/
export const formFields = {

    signIn: {
      username: {
        label: 'Login (email):',
        placeholder: 'Wprowadź adres email',
      },
      password: {
        label: 'Podaj Hasło',
        placeholder: 'Wprowadź Hasło'
      }
    },

    signUp: {
      email: {
        label: 'Login (email):',
        placeholder: 'Wprowadź adres email',
      },
      password: {
        label: 'Hasło:',
        placeholder: 'Wprowadź Hasło',
        isRequired: false,
        order: 1,
      },
      confirm_password: {
        label: 'Powtórz Hasło:',
        placeholder: 'Powtórz Hasło',
        order: 2,
      }
    },
    
    forceNewPassword: {
      password: {
        
        placeholder: 'Wpisz nowe Hasło:',
      },
    },
    
    resetPassword: {

      username: {
        placeholder: 'Podaj adres email:',
      },
    },
    
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter your Password Please:',
      },
    },
    
    setupTOTP: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    
    confirmSignIn: {
      confirmation_code: {
        label: 'Potwierdzanie adresu',
        placeholder: 'Wpisz kod potwierdzający:',
        isRequired: false,
      },
    },
};
