import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  doc,
  where,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactRequestService {
  private firestore = inject(Firestore);

  async createRequest(request: any) {
    const requestsRef = collection(this.firestore, 'contactRequests');

    return addDoc(requestsRef, request);
  }

  getRequests(): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'contactRequests');

    return collectionData(requestsRef, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  async updateRequest(id: string, data: any) {
    const requestDoc = doc(this.firestore, `contactRequests/${id}`);

    return await updateDoc(requestDoc, data);
  }

  getRequestsByUser(uid: string): Observable<any[]> {
  const requestsRef = collection(this.firestore, 'contactRequests');

  const q = query(
    requestsRef,
    where('uidUsuario', '==', uid)
  );

  return collectionData(q, {
    idField: 'id',
  }) as Observable<any[]>;
}
}
