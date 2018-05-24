import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export class ResourceConfigValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if(control.value == null) {
            return null;
        }
        if((control.value as string).indexOf(' ') != -1){
            return { cannotContainSpace: true }
        }
        return null;
    }
}