import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"







export const matchpassword : ValidatorFn = (control: AbstractControl): ValidationErrors|null =>{

    let password = control.get('AccountPassword');
    let confirmpassword = control.get('AccountPasswordConfirmation');
    if(password?.value != confirmpassword?.value){
        return{
            passwordmatcherror : true
        }
    }
    return null;
}