import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/_customer/customer.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Customer } from '../_viewmodel/customer/customer';
import { $ } from 'protractor';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  FormSpinner: boolean;
  customers: Customer[] = [];
  constructor(private customerService: CustomerService, private alertify: AlertifyService, private router: Router) {
    this.FormSpinner = true;
  }

  ngOnInit() {
    this.getCustomers(null);
  }
  getCustomers(customerId: number) {
    this.customerService.getCustomerLists(customerId).subscribe(next => {
      // alert('login ok');
      this.customers = next.data;
      this.FormSpinner = false;
    }, error => {
      this.alertify.error(error);
      console.log(error);
      this.FormSpinner = false;
    });
  }
}
