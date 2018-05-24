import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Vcenter, Ovfs, ResourceConfig } from '../shared/v1830.model'; 
import { ResourceConfigValidators } from './resourceconfig.validators';
import { V1830RestService } from '../restAPI.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/timer';
import { DISABLED } from '@angular/forms/src/model';

@Component({
    selector: 'v1830-addeditresource',
    templateUrl: 'resourceconfigaddedit.component.html'
})

export class ResourceconfigAddEditComponent implements OnInit{
    private emptyrcobject: ResourceConfig = {name: '', mqttserver: '', diskmode:'nomode', localinstall: false, vcenter: {name:'', ipaddress:'', username:'', password:''}, ovftemplate: {name:'',product:'', version:'', url:''} , datastore: '', datacenter: '', cluster:'', network:'',netgmre:'',netoamp:'',nete1:'',nete2:'', netvoip:'', netilan:'', netcit:'', netauxa:'', netauxb:''};
    private addResource: ResourceConfig = Object.assign({}, this.emptyrcobject);
    private vcenters$: Observable<Array<Vcenter>>;
    private ovftemplates$: Observable<Array<Ovfs>>;
    private datacenter$: Observable<Array<string>>;
    private clusters$: Observable<Array<string>>;
    private datastores$: Observable<Array<string>>;
    private networks$: Observable<Array<string>>;
    constructor(private v1830RestService: V1830RestService){

    }

    ngOnInit() {
        //this.v1830RestService.getVcenter().subscribe((res => this.vcenters$ = res));
        //this.v1830RestService.getOvfs().subscribe((res => this.ovftemplates$ = res));
        this.vcenters$ = this.v1830RestService.getVcenter();
        this.ovftemplates$ = this.v1830RestService.getOvfs();
        this.onChanges();
    }

    rcform = new FormGroup({
        rcname: new FormControl(this.addResource.name, [Validators.required, ResourceConfigValidators.cannotContainSpace, Validators.pattern('^[a-zA-Z0-9-_]+$')],
       [this.shouldBeUnique.bind(this)]),
        mqttserver: new FormControl(this.addResource.mqttserver, Validators.required),
        diskmode: new FormControl(this.addResource.diskmode, Validators.required),
        localinstall: new FormControl(this.addResource.localinstall, Validators.required),
        ovftemplate: new FormControl(this.addResource.ovftemplate, Validators.required),
        vcenter: new FormControl(this.addResource.vcenter, Validators.required),
        datacenter: new FormControl(this.addResource.datacenter, Validators.required),
        cluster: new FormControl(this.addResource.cluster, Validators.required),
        datastore: new FormControl(this.addResource.datastore, Validators.required),
        network: new FormControl(this.addResource.network, Validators.required),
        networkgmre: new FormControl(this.addResource.netgmre, Validators.required),
        configureallports: new FormControl(false, Validators.required),
        networkoamp: new FormControl(this.addResource.netoamp, Validators.required),
        networke1: new FormControl(this.addResource.nete1, Validators.required),
        networke2: new FormControl(this.addResource.nete2, Validators.required),
        networkvoip: new FormControl(this.addResource.netvoip, Validators.required),
        networkilan: new FormControl(this.addResource.netilan, Validators.required),
        networkcit: new FormControl(this.addResource.netcit, Validators.required),
        networkauxa: new FormControl(this.addResource.netauxa, Validators.required),
        networkauxs: new FormControl(this.addResource.netauxb, Validators.required)
    });

    get rcname() {
        return this.rcform.get('rcname');
    }
    get mqttserver() {
        return this.rcform.get('mqttserver');
    }
    get diskmode() {
        return this.rcform.get('diskmode');
    }
    get localinstall() {
        return this.rcform.get('localinstall');
    }
    get ovftemplate() {
        return this.rcform.get('ovftemplate');
    }
    get vcenter() {
        return this.rcform.get('vcenter');
    }
    get datacenter() {
        return this.rcform.get('datacenter');
    }
    get cluster() {
        return this.rcform.get('cluster');
    }
    get datastore() {
        return this.rcform.get('datastore');
    }
    get network() {
        return this.rcform.get('network');
    }
    get networkgmre() {
        return this.rcform.get('networkgmre');
    }
    get configureallports() {
        return this.rcform.get('configureallports');
    }
    get networkoamp() {
        return this.rcform.get('networkoamp');
    }
    get networke1() {
        return this.rcform.get('networke1');
    }
    get networke2() {
        return this.rcform.get('networke2');
    }
    get networkvoip() {
        return this.rcform.get('networkvoip');
    }
    get networkilan() {
        return this.rcform.get('networkilan');
    }
    get networkcit() {
        return this.rcform.get('networkcit');
    }
    get networkauxa() {
        return this.rcform.get('networkauxa');
    }
    get networkauxs() {
        return this.rcform.get('networkauxs');
    }

    
    onChanges(): void {
        console.log('this.vcenter.value.name', this.vcenter.value.name);
        console.log('this.datacenter.value', this.datacenter.value);
        console.log('this.cluster.value', this.cluster.value);
        if(this.vcenter.value.name == '') {
            this.datacenter.disable();
        } 
        if(this.datacenter.value == '') {
            this.cluster.disable();
        }
        if(this.cluster.value == '') {
            this.datastore.disable();
            this.network.disable();
            this.networkgmre.disable();
            this.networkoamp.disable();
            this.networke1.disable();
            this.networke2.disable();
            this.networkvoip.disable();
            this.networkcit.disable();
            this.networkilan.disable();
            this.networkauxa.disable();
            this.networkauxs.disable();
        }
      
        this.rcform.get('ovftemplate').valueChanges.subscribe(val => {
            console.log(val);
        });
        this.rcform.get('configureallports').valueChanges.subscribe(val => {
            console.log('formcontrol value', val);
            
        });
        this.vcenter.valueChanges.subscribe(val => {
            console.log('vcenter changed');
            this.datacenter.setValue('');
            this.cluster.setValue('');
            this.datastore.setValue('');
            this.network.setValue('');
            this.networkgmre.setValue('');
            this.networkoamp.setValue('');
            this.networke1.setValue('');
            this.networke2.setValue('');
            this.networkvoip.setValue('');
            this.networkilan.setValue('');
            this.networkcit.setValue('');
            this.networkauxa.setValue('');
            this.networkauxs.setValue('');
            this.networkoamp.setValue('');
            this.datacenter$ = this.v1830RestService.getDataCenterForVC(val);
        });
        this.datacenter.valueChanges.subscribe(val => {
            console.log('datacenter changed');
            this.datastore.setValue('');
            this.network.setValue('');
            this.networkgmre.setValue('');
            this.networkoamp.setValue('');
            this.networke1.setValue('');
            this.networke2.setValue('');
            this.networkvoip.setValue('');
            this.networkilan.setValue('');
            this.networkcit.setValue('');
            this.networkauxa.setValue('');
            this.networkauxs.setValue('');
            this.networkoamp.setValue('');
            let dcobj = Object.assign({}, this.vcenter.value);
            dcobj['datacenter'] = val;
            console.log('dcobj --- ', dcobj);
            this.clusters$ = this.v1830RestService.getClusterForVC(dcobj);
        });
        this.cluster.valueChanges.subscribe(val => {
            console.log('cluster changed');
            this.datastore.setValue('');
            this.network.setValue('');
            this.networkgmre.setValue('');
            this.networkoamp.setValue('');
            this.networke1.setValue('');
            this.networke2.setValue('');
            this.networkvoip.setValue('');
            this.networkilan.setValue('');
            this.networkcit.setValue('');
            this.networkauxa.setValue('');
            this.networkauxs.setValue('');
            this.networkoamp.setValue('');
            let clobj = Object.assign({}, this.vcenter.value);
            clobj['datacenter'] = this.datacenter.value;
            clobj['cluster'] = val;
            console.log('clobj --- ', clobj);
            this.datastores$ = this.v1830RestService.getDataStoreForVC(clobj);
            this.networks$ = this.v1830RestService.getNetworkForVC(clobj);
        });
    }

    shouldBeUnique(control: AbstractControl): Observable<ValidationErrors | null> {
        return Observable
        .timer(3000)
        .debounceTime(3000)
        .distinctUntilChanged()
        .switchMap(()=>{
            return this.v1830RestService
                .checkRCName(control.value)
        })
        .map(res => res.json())
        .map(res => res ? {shouldBeUnique: true}: null)
    }

    onAddCancel(){
        console.log('clear form');
        this.rcform.reset();
    }
}