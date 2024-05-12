import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    // Check if value is provided and it's a string
    if (!value || typeof value !== 'string') {
      return value; // Return the original value if it's not a string
    }
    
    // Remove any non-numeric characters from the input string
    const numericValue = value.replace(/\D/g, '');
    
    // Format the number as +91 11111 11111
    return `+91 ${numericValue.slice(0, 5)} ${numericValue.slice(5, 10)}`;
  }
}
