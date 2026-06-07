import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactRequestService {

  private firestore = inject(Firestore);

  async createRequest(request: any) {
    const requestsRef = collection(this.firestore, 'contactRequests');

    return addDoc(requestsRef, request);
  }
}