// Contract Detail Main

var CustomerName = null, ContractId = null;

function Product_OnChange() {
    var baseProductLookupItem = Xrm.Page.getAttribute("productid").getValue();
    if (baseProductLookupItem == null || baseProductLookupItem[0] == null) {
        return null;
    }
    var productId = baseProductLookupItem[0].id;

    this.CheckProductAddtionalService(productId);
}

function CheckProductAddtionalService(productId) {
    var select = "ProductTypeCode"; //"$select=ProductTypeCode&$filter=ProductId eq guid'" + productId + "'";
    SDK.REST.retrieveRecord(
        productId,
        "Product",
        select,
        null,
        function (result) {
            //debugger;
            var product = result;
            if (product == null) {
                Xrm.Page.getAttribute("new_additionalservicetype").setRequiredLevel("none");
                return false;
            }

            var productType = product.ProductTypeCode;
            if (product.ProductTypeCode == null) {
                Xrm.Page.getAttribute("new_additionalservicetype").setRequiredLevel("none");
                return false;
            }

            if (productType.Value == 201002) {//خدمات اضافی دیتاسنتر
                Xrm.Page.getAttribute("new_additionalservicetype").setRequiredLevel("none");
            } else {
                Xrm.Page.getAttribute("new_additionalservicetype").setRequiredLevel("none");
            }

        },
        function (error) {
            alert(error.message);
            return false;
        }
    );
};

function RetrieveCustomer(retrieveReq) {
    if (retrieveReq.readyState == 4) {

        var retrieved = JSON.parse(retrieveReq.responseText).d;
        CustomerName = retrieved.results[0].CustomerId.Name;
        document.getElementById("form_title_div").childNodes[2].childNodes[0].innerText += " - " + CustomerName;
    }
}


function RetrieveContract(retrieveReq) {
    if (retrieveReq.readyState == 4) {

        var retrieved = JSON.parse(retrieveReq.responseText).d;
        ContractId = retrieved.results[0].ContractId.Id;
    }
}


function RetrieveContractState(retrieveReq) {

    if (retrieveReq.readyState == 4) {

        var retrieved = JSON.parse(retrieveReq.responseText).d;
        ContractState = retrieved.results[0].New_ContractAfraState.Value;

        if (!HasHesabdariPermission() && ContractState != 5) {

            /*crmForm.all.activeon.Disabled = true;
            crmForm.all.expireson.Disabled = true;
            crmForm.all.productid.Disabled = true;
            crmForm.all.uomid.Disabled = true;
            crmForm.all.title.Disabled = true;
            crmForm.all.customerid.Disabled = true;
            crmForm.all.price.Disabled = true;
            crmForm.all.totalallotments.Disabled = true;
            crmForm.all.new_quantity.Disabled = true;
            crmForm.all.new_unitprice.Disabled = true;*/

            Xrm.Page.ui.controls.get("activeon").setDisabled(true);
            Xrm.Page.ui.controls.get("expireson").setDisabled(true);
            Xrm.Page.ui.controls.get("productid").setDisabled(true);
            Xrm.Page.ui.controls.get("uomid").setDisabled(true);
            Xrm.Page.ui.controls.get("title").setDisabled(true);
            Xrm.Page.ui.controls.get("customerid").setDisabled(true);
            Xrm.Page.ui.controls.get("price").setDisabled(true);
            Xrm.Page.ui.controls.get("totalallotments").setDisabled(true);
            Xrm.Page.ui.controls.get("new_quantity").setDisabled(true);
            Xrm.Page.ui.controls.get("new_unitprice").setDisabled(true);

            /*crmForm.all.new_sendbandwidth.Disabled = true;
            crmForm.all.new_receivebandwidth.Disabled = true;
            crmForm.all.new_linktype.Disabled = true;
            crmForm.all.serviceaddress.Disabled = true;*/

            Xrm.Page.ui.controls.get("new_sendbandwidth").setDisabled(true);
            Xrm.Page.ui.controls.get("new_receivebandwidth").setDisabled(true);
            Xrm.Page.ui.controls.get("new_linktype").setDisabled(true);
            Xrm.Page.ui.controls.get("serviceaddress").setDisabled(true);

            /*crmForm.all.new_backup.Disabled = false;
            crmForm.all.new_servicetype.Disabled = false;
            crmForm.all.new_serverbrand.Disabled = false;
            crmForm.all.new_ramcount.Disabled = false;
            crmForm.all.new_cpuproperties.Disabled = false;
            crmForm.all.new_storagecount.Disabled = false;
            crmForm.all.new_storageproperties.Disabled = false;
            crmForm.all.new_unit.Disabled = false;*/

            Xrm.Page.ui.controls.get("new_backup").setDisabled(false);
            Xrm.Page.ui.controls.get("new_servicetype").setDisabled(false);
            Xrm.Page.ui.controls.get("new_serverbrand").setDisabled(false);
            Xrm.Page.ui.controls.get("new_ramcount").setDisabled(false);
            Xrm.Page.ui.controls.get("new_cpuproperties").setDisabled(false);
            Xrm.Page.ui.controls.get("new_storagecount").setDisabled(false);
            Xrm.Page.ui.controls.get("new_storageproperties").setDisabled(false);
            Xrm.Page.ui.controls.get("new_unit").setDisabled(false);


            /*crmForm.all.new_internetsend.Disabled = false;
            crmForm.all.new_internetreceive.Disabled = false;
            crmForm.all.new_intranetsend.Disabled = false;
            crmForm.all.new_intranetreceive.Disabled = false;*/

            Xrm.Page.ui.controls.get("new_internetsend").setDisabled(false);
            Xrm.Page.ui.controls.get("new_internetreceive").setDisabled(false);
            Xrm.Page.ui.controls.get("new_intranetsend").setDisabled(false);
            Xrm.Page.ui.controls.get("new_intranetreceive").setDisabled(false);

            /*crmForm.all.new_vpn.Disabled = false;
            crmForm.all.new_traffic.Disabled = false;
            crmForm.all.new_traffic.Disabled = false;
            crmForm.all.new_backup.Disabled = false;
            crmForm.all.new_backupdesc.Disabled = false;
            crmForm.all.new_serveradmin.Disabled = false;
            crmForm.all.new_kvm.Disabled = false;
            crmForm.all.new_remotereboot.Disabled = false;
            crmForm.all.new_pleskcontrolpanel.Disabled = false;
            crmForm.all.new_firewallrules.Disabled = false;*/

            Xrm.Page.ui.controls.get("new_vpn").setDisabled(false);
            Xrm.Page.ui.controls.get("new_traffic").setDisabled(false);
            Xrm.Page.ui.controls.get("new_backup").setDisabled(false);
            Xrm.Page.ui.controls.get("new_backupdesc").setDisabled(false);
            Xrm.Page.ui.controls.get("new_serveradmin").setDisabled(false);
            Xrm.Page.ui.controls.get("new_kvm").setDisabled(false);
            Xrm.Page.ui.controls.get("new_remotereboot").setDisabled(false);
            Xrm.Page.ui.controls.get("new_pleskcontrolpanel").setDisabled(false);
            Xrm.Page.ui.controls.get("new_firewallrules").setDisabled(false);


            /*crmForm.all.new_ethernetcrossconnection.Disabled = false;
            crmForm.all.new_servieplatform.Disabled = false;
            crmForm.all.new_maxwebsites.Disabled = false;
            crmForm.all.new_emailvolume.Disabled = false;
            crmForm.all.new_numberofdomain.Disabled = false;
            crmForm.all.new_sqlservervolume.Disabled = false;
            crmForm.all.new_mssql.Disabled = false;
            crmForm.all.new_servermonthlytraffic.Disabled = false;
            crmForm.all.new_hostingspace.Disabled = false;
            crmForm.all.new_mysqlcount.Disabled = false;
            crmForm.all.new_mysqlvolume.Disabled = false;
            crmForm.all.new_mailboxvolume.Disabled = false;*/

            Xrm.Page.ui.controls.get("new_ethernetcrossconnection").setDisabled(false);
            Xrm.Page.ui.controls.get("new_servieplatform").setDisabled(false);
            Xrm.Page.ui.controls.get("new_maxwebsites").setDisabled(false);
            Xrm.Page.ui.controls.get("new_emailvolume").setDisabled(false);
            Xrm.Page.ui.controls.get("new_numberofdomain").setDisabled(false);
            Xrm.Page.ui.controls.get("new_sqlservervolume").setDisabled(false);
            Xrm.Page.ui.controls.get("new_mssql").setDisabled(false);
            Xrm.Page.ui.controls.get("new_servermonthlytraffic").setDisabled(false);
            Xrm.Page.ui.controls.get("new_hostingspace").setDisabled(false);
            Xrm.Page.ui.controls.get("new_mysqlcount").setDisabled(false);
            Xrm.Page.ui.controls.get("new_mysqlvolume").setDisabled(false);
            Xrm.Page.ui.controls.get("new_mailboxvolume").setDisabled(false);



            /*crmForm.all.new_dedicatedroutableip.Disabled = false;
            crmForm.all.new_storagepereachmailbox.Disabled = false;
            crmForm.all.new_packagetotalstorage.Disabled = false;
            crmForm.all.new_addon.Disabled = false;
            crmForm.all.new_packagetotaltafficmonthly.Disabled = false;*/


            Xrm.Page.ui.controls.get("new_dedicatedroutableip").setDisabled(false);
            Xrm.Page.ui.controls.get("new_storagepereachmailbox").setDisabled(false);
            Xrm.Page.ui.controls.get("new_packagetotalstorage").setDisabled(false);
            Xrm.Page.ui.controls.get("new_addon").setDisabled(false);
            Xrm.Page.ui.controls.get("new_packagetotaltafficmonthly").setDisabled(false);

        }
        else {
            /*crmForm.all.activeon.Disabled = false;
            crmForm.all.expireson.Disabled = false;
            crmForm.all.productid.Disabled = false;
            crmForm.all.uomid.Disabled = false;
            crmForm.all.title.Disabled = false;
            crmForm.all.customerid.Disabled = false;
            crmForm.all.price.Disabled = false;
            crmForm.all.totalallotments.Disabled = false;
            crmForm.all.new_quantity.Disabled = false;
            crmForm.all.new_unitprice.Disabled = false;*/

            Xrm.Page.ui.controls.get("activeon").setDisabled(false);
            Xrm.Page.ui.controls.get("expireson").setDisabled(false);
            Xrm.Page.ui.controls.get("productid").setDisabled(false);
            Xrm.Page.ui.controls.get("uomid").setDisabled(false);
            Xrm.Page.ui.controls.get("title").setDisabled(false);
            Xrm.Page.ui.controls.get("customerid").setDisabled(false);
            Xrm.Page.ui.controls.get("price").setDisabled(false);
            Xrm.Page.ui.controls.get("totalallotments").setDisabled(false);
            Xrm.Page.ui.controls.get("new_quantity").setDisabled(false);
            Xrm.Page.ui.controls.get("new_unitprice").setDisabled(false);

            /*crmForm.all.new_sendbandwidth.Disabled = false;
            crmForm.all.new_receivebandwidth.Disabled = false;
            crmForm.all.new_linktype.Disabled = false;
            crmForm.all.serviceaddress.Disabled = false;*/

            Xrm.Page.ui.controls.get("new_sendbandwidth").setDisabled(false);
            Xrm.Page.ui.controls.get("new_receivebandwidth").setDisabled(false);
            Xrm.Page.ui.controls.get("new_linktype").setDisabled(false);
            Xrm.Page.ui.controls.get("serviceaddress").setDisabled(false);
        }



    }
}

function Form_onload() {
    //var _serverUrl = "http://crm2015web/Afranet";
    //var oDataPath = _serverUrl + "/xrmservices/2011/organizationdata.svc";

    this.Product_OnChange();

    var _serverUrl = document.location.protocol + "//" + document.location.host + "/" + Xrm.Page.context.getOrgUniqueName();
    // if (Xrm.Page.context.getClientUrl)//Post UR 12
    // {
    // _serverUrl = Xrm.Page.context.getClientUrl();
    // }
    var oDataPath = _serverUrl + "/XRMServices/2011/OrganizationData.svc/";

    var contractdetailid = Xrm.Page.data.entity.getId();
    if (contractdetailid != null || window.top.opener.parent.Xrm.Page.data.entity.getId() != null) {

        if (contractdetailid != null) {
            var retrieveReq = new XMLHttpRequest();

            var OdataContract = oDataPath + "/ContractDetailSet?$select=ContractId&$filter=ContractDetailId eq guid'" + contractdetailid + "'";
            retrieveReq.open("GET", OdataContract, false);
            retrieveReq.setRequestHeader("Accept", "application/json");
            retrieveReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            retrieveReq.onreadystatechange = function () { RetrieveContract(this); };
            retrieveReq.send();

        }
        else {
            ContractId = window.top.opener.parent.Xrm.Page.data.entity.getId();
        }
    }

    var retrieveReqContract = new XMLHttpRequest();
    var OdataContract = oDataPath + "/ContractSet?$select=CustomerId&$filter=ContractId eq guid'" + ContractId + "'";
    retrieveReqContract.open("GET", OdataContract, false);
    retrieveReqContract.setRequestHeader("Accept", "application/json");
    retrieveReqContract.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    retrieveReqContract.onreadystatechange = function () { RetrieveCustomer(this); };
    retrieveReqContract.send();


    var retrieveReqContractState = new XMLHttpRequest();
    var OdataContractstate = oDataPath + "/ContractSet?$select=New_ContractAfraState&$filter=ContractId eq guid'" + ContractId + "'";
    retrieveReqContract.open("GET", OdataContractstate, false);
    retrieveReqContract.setRequestHeader("Accept", "application/json");
    retrieveReqContract.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    retrieveReqContract.onreadystatechange = function () { RetrieveContractState(this); };
    retrieveReqContract.send();

    //.فيلدهاي بلااستفاده در فرم قرارداد به اين تب منتقل شده و اين تب مخفي مي شود
    setVisibleTabSection('Administration', null, false);

    var oField = Xrm.Page.getAttribute("totalallotments");
    var oFieldQuantity = Xrm.Page.getAttribute("new_quantity");
    var oFieldUnitPrice = Xrm.Page.getAttribute("new_unitprice");
    var oFieldOldPrice = Xrm.Page.getAttribute("price");
    var CRM_FORM_TYPE_CREATE = 1;
    //.اين فيلدها بلااستفاده هستند و چون از نظر سيستمي اجباري هستند با مقادير پيش‌فرض پر مي‌شوند
    oField.setValue(0);
    oFieldOldPrice.setValue(0);

    if (Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_CREATE) {
        //.تعداد، با مقدار پيش فرض "1" پر مي‌شود
        oFieldQuantity.setValue(1);

        //.مبلغ با مقدار پيش فرض "0" پر مي‌شود
        oFieldUnitPrice.setValue(0);
    }

    ///////////////////////////////////////Show Tabs base on Product
    var productId;
    productId = GetProductId();
    SetDefaultVisibilityTab();
    if (productId != null) {
        SetControlsVisibility(productId);
    }

    ///////////////////////////////////// Hide Some Controls base on Business unit(Data Center or BroadBand)
    ConfigureAccordingToBusinessUnit();

    //////////////////////////////////////////////////////Functions//////////////////////////////////////////////////////
    function GetProductId() // .اين متد شناسه محصول انتخاب‌شده در فرم را برمي‌گرداند
    {
        var baseProductLookupItem = new Array;
        baseProductLookupItem = Xrm.Page.getAttribute("productid").getValue();
        if (baseProductLookupItem == null || baseProductLookupItem[0] == null) {
            return null;
        }
        else {
            return baseProductLookupItem[0].id;
        }
    }
    /////////////////////////////////////////////////////
    function SetControlsVisibility(productId) // .اين متد کنترل هاي فرم را بر اساس کالاي انتخاب شده نمايش/مخفي مي کند
    {
        switch (productId) {
            //خدمات میزبانی سایت
            case "{647C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('WebHostingInfo', null, true);
                break;

                //فضای رک اقتصادی (Economy Co-Location)   
            case "{047C0804-C4B4-E811-80D9-005056A85B17}":
                //فضای رک استاندارد (Standard Co-Location)   
            case "{067C0804-C4B4-E811-80D9-005056A85B17}":
                //فضای رک پیشرفته (Advanced Co-Location)   
            case "{087C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;
            case "{4B138184-66D1-EA11-80E6-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;

            case "{14A719DE-66D1-EA11-80E6-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;
            case "{DD283DD6-A1D9-EA11-80EA-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;
            case "{89814C57-1FDA-EA11-80EA-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;
            case "{0F89B375-1FDA-EA11-80EA-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;


                //سروراختصاصی مجازی  
            case "{447C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;

                //سرور اختصاصی اقتصادی (Economy Dedicated Server)
            case "{147C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور اختصاصی استاندارد (Standard Dedicated Server)
            case "{167C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور اختصاصی پیشرفته (Advanced Dedicated Server)
            case "{187C0804-C4B4-E811-80D9-005056A85B17}":
            case "{C72E8C04-A3D9-EA11-80EA-005056A87D6A}":
            case "{E0FD4E1A-A3D9-EA11-80EA-005056A87D6A}":      
            case "{C3F7CE2F-A3D9-EA11-80EA-005056A87D6A}":
            case "{5E97762E-1EDA-EA11-80EA-005056A87D6A}":
            case "{169E2642-1EDA-EA11-80EA-005056A87D6A}":
        
       // ویژه سرور اختصاصی سازمانی (Enterprise Dedicated Server)
            case "{0E5BE278-B0C8-EA11-80E6-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;

                //سرور اختصاصی سازمانی (Enterprise Dedicated Server)
            case "{1A7C0804-C4B4-E811-80D9-005056A85B17}":
            case "{C8CC70D9-1DDA-EA11-80EA-005056A87D6A}":
            case "{79E6DB63-A3D9-EA11-80EA-005056A87D6A}":
            case "{CFE96378-A3D9-EA11-80EA-005056A87D6A}":
            case "{04FC36E0-0DDA-EA11-80EA-005056A87D6A}":
            case "{C8CC70D9-1DDA-EA11-80EA-005056A87D6A}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);
                break;



                //ایمیل سازمانی (Enterprise Mail)    
            case "{5E7C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('MailService', null, true);
                break;

                //پهنای باند اینترنت اختصاصی بیسیم (Wireless Bandwidth)
            case "{847C0804-C4B4-E811-80D9-005056A85B17}":
                //پهنای باند اینترنت اختصاصی بستر VPLS
            case "{887C0804-C4B4-E811-80D9-005056A85B17}":
                //پهنای باند اینترنت اختصاصی  بستر اینترانت
            case "{8E7C0804-C4B4-E811-80D9-005056A85B17}":
                //فروش و اجاره تجهیزات
            case "{C07C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('TechnicalInformation', null, true);
                break;

                //پهنای باند اینترنت اختصاصی بیسیم (Wireless Bandwidth)
            case "{847C0804-C4B4-E811-80D9-005056A85B17}":
                //پهنای باند اینترنت اختصاصی  بستر اینترانت
            case "{8E7C0804-C4B4-E811-80D9-005056A85B17}":
                //پهنای باند اینترانت اختصاصی
            case "{BC7C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('TechnicalInformation', null, true);
                break;

                //اجاره سرور اختصاصی ابری
            case "{52F8A303-2279-E411-B23D-002264F9C72C}":
                //سرور مجازی (VPS)
            case "{447C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری مایکرو (Micro Cloud Server)
            case "{487C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری کوچک (Small Cloud Server)
            case "{4A7C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری متوسط (Medium Cloud Server)
            case "{4C7C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری بزرگ (Large Cloud Server)
            case "{4E7C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری خیلی بزرگ (XLarge Cloud Server)
            case "{507C0804-C4B4-E811-80D9-005056A85B17}":
                //سرور ابری بسیار بزرگ (XXLarge Cloud Server)
            case "{527C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('CloudRentalServer', null, true);
                break;

                //ترافیک مازاد (Extra Traffic)
            case "{6C7C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //فضای ذخیره سازی (FTP Storage) FTP
            case "{7C7C0804-C4B4-E811-80D9-005056A85B17}":
                //اینترانت اختصاصی (Dedicated Intranet)
            case "{707C0804-C4B4-E811-80D9-005056A85B17}":
                setVisibleTabSection('ServerInfo', null, true);
                break;

                //سرویس پشتیبان گیری ( backup properties)
            case "{17CC555D-A995-E911-80DB-005056A85B17}":
                setVisibleTabSection('backupinfo', null, true);
                break;

        }
    }

    ////////////////////////////////////////////////////
    function SetDefaultVisibilityTab() {
        setVisibleTabSection('ServerInfo', null, false);
        setVisibleTabSection('BandwidthInfo', null, false);
        setVisibleTabSection('FacilitiesInfo', null, false);
        setVisibleTabSection('WebHostingInfo', null, false);
        setVisibleTabSection('MailService', null, false);
        setVisibleTabSection('Administration', null, false);
        setVisibleTabSection('TechnicalInformation', null, true);
        setVisibleTabSection('CloudRentalServer', null, false);
        setVisibleTabSection('backupinfo', null, false);
    }


    function ConfigureAccordingToBusinessUnit() {
        //***********************

        //var busUnitId = null;
        //    var request = "<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>" +
        //    "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />" +
        //    "<a:RequestId i:nil='true' />" +
        //    "<a:RequestName>WhoAmI</a:RequestName>" +
        //    "</request>";
        //    var response = XrmServiceToolkit.Soap.Execute(request);
        //    if (window.parent.Mscrm.Utilities.isChrome()) {
        //        organizationId = response.getElementsByTagName("BusinessUnitId")[0].childNodes[2].childNodes[1].textContent;
        //    }
        //    else {
        //        organizationId = response.getElementsByTagName("a:BusinessUnitId")[0].childNodes[2].childNodes[1].textContent;
        //    }
        // busUnitId = response.getElementsByTagName("BusinessUnitId")[0].childNodes[0].nodeValue;
        var busUnitId = XrmServiceToolkit.Soap.GetCurrentUserBusinessUnitId();


        //************************








        /*Define the soapBody for the WhoAmI request.*/
        //       var soapBody = "<soap:Body>" +
        //"<Execute xmlns='http://schemas.microsoft.com/crm/2007/" +
        //"WebServices'>" +
        //"<Request xsi:type='WhoAmIRequest' /> " +
        //"</Execute></soap:Body>";

        //       /*Wrap the Soap Body in a soap:Envelope.*/
        //       var soapXml = "<soap:Envelope " +
        //"xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' " +
        //"xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " +
        //"xmlns:xsd='http://www.w3.org/2001/XMLSchema'>";
        //       //soapXml += Xrm.Page.context.getAuthenticationHeader();
        //       soapXml += soapBody;
        //       soapXml += "</soap:Envelope>";


        //       /* Create the XMLHTTP object for the execute method.*/
        //       var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        //       xmlhttp.open("POST", "/MSCRMservices/2007/crmservice." +
        //"asmx", false);
        //       xmlhttp.setRequestHeader("Content-Type", "text/xml; " +
        //"charset=utf-8");
        //       xmlhttp.setRequestHeader("SOAPAction", "http://schemas." +
        //"microsoft.com/crm/2007/WebServices/Execute");

        //       /* Send the XMLHTTP object. */
        //       xmlhttp.send(soapXml);

        //       /* Create an XML object to parse the results.*/
        //       xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        //       xmlDoc.async = false;
        //       xmlDoc.loadXML(xmlhttp.responseXML.xml);

        //       /* Get the user's ID. */
        //       var userid;
        //       try {
        //           //var rawUserid = xmlDoc.getElementsByTagName("UserId")[0].childNodes[0].nodeValue;
        //           var busUnitId = xmlDoc.getElementsByTagName("BusinessUnitId")[0].childNodes[0].nodeValue;
        //           //document.write(busUnitId);
        //           // Afranet Business Unit ID: {ed66bfaf-79ad-dd11-91ce-001cc4de83c0}
        //           // DataCenter Business Unit ID: {5c622c65-5e48-df11-9a8d-001cc4de83c0}
        //           // Broadband Business Unit ID: {506c058e-5e48-df11-9a8d-001cc4de83c0}

        //       }
        //       catch (e) {
        //           err = xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
        //           alert("Error :" + e.description + " : " + err);
        //       }
    }
}
function productid_onchange() {
    //////////////////////////////////////////////////////Functions//////////////////////////////////////////////////////
    function GetProductId() // .اين متد شناسه محصول انتخاب‌شده در فرم را برمي‌گرداند
    {
        var baseProductLookupItem = new Array;
        baseProductLookupItem = Xrm.Page.getAttribute("productid").getValue();
        if (baseProductLookupItem == null || baseProductLookupItem[0] == null) {
            return null;
        }
        else {
            return baseProductLookupItem[0].id;
        }
    }
    /////////////////////////////////////////////////////
    function SetControlsVisibility(productId) // .اين متد کنترل هاي فرم را بر اساس کالاي انتخاب شده نمايش/مخفي مي کند
    {
        switch (productId) {
            //WebHosting 
            case "{7E51F002-B060-DF11-9A8D-001CC4DE83C0}":
                setVisibleTabSection('WebHostingInfo', null, true);
                break;
                //Co-Location 
            case "{52604472-AF60-DF11-9A8D-001CC4DE83C0}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);

                //crmForm.all.new_serverbrand_c.style.display = 'none';
                //crmForm.all.new_serverbrand_d.style.display = 'none';
                Xrm.Page.ui.controls.get("new_serverbrand").setVisible(false);

                //crmForm.all.new_ramcount_c.style.display = 'none';
                //crmForm.all.new_ramcount_d.style.display = 'none';
                Xrm.Page.ui.controls.get("new_ramcount").setVisible(false);

                //crmForm.all.new_cpuproperties_c.style.display = 'none';
                //crmForm.all.new_cpuproperties_d.style.display = 'none';
                Xrm.Page.ui.controls.get("new_cpuproperties").setVisible(false);

                //crmForm.all.new_storageproperties_c.style.display = 'none';
                //crmForm.all.new_storageproperties_d.style.display = 'none';
                Xrm.Page.ui.controls.get("new_storageproperties").setVisible(false);

                //crmForm.all.new_storagecount_c.style.display = 'none';
                //crmForm.all.new_storagecount_d.style.display = 'none';
                Xrm.Page.ui.controls.get("new_storagecount").setVisible(false);

                break;
                //Virtual Server 
            case "{2659A3A0-B460-DF11-9A8D-001CC4DE83C0}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);

                //crmForm.all.new_serverbrand_c.style.display = 'inline';
                //crmForm.all.new_serverbrand_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_serverbrand").setVisible(true);

                //crmForm.all.new_ramcount_c.style.display = 'inline';
                //crmForm.all.new_ramcount_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_ramcount").setVisible(true);

                //crmForm.all.new_cpuproperties_c.style.display = 'inline';
                //crmForm.all.new_cpuproperties_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_cpuproperties").setVisible(true);

                //crmForm.all.new_storageproperties_c.style.display = 'inline';
                //crmForm.all.new_storageproperties_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_storageproperties").setVisible(true);

                //crmForm.all.new_storagecount_c.style.display = 'inline';
                //crmForm.all.new_storagecount_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_storagecount").setVisible(true);

                break;
                //Co-Hosting 
            case "{982EA65C-AE60-DF11-9A8D-001CC4DE83C0}":
                setVisibleTabSection('ServerInfo', null, true);
                setVisibleTabSection('BandwidthInfo', null, true);
                setVisibleTabSection('FacilitiesInfo', null, true);


                //crmForm.all.new_serverbrand_c.style.display = 'inline';
                //crmForm.all.new_serverbrand_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_serverbrand").setVisible(true);

                //crmForm.all.new_ramcount_c.style.display = 'inline';
                //crmForm.all.new_ramcount_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_ramcount").setVisible(true);

                //crmForm.all.new_cpuproperties_c.style.display = 'inline';
                //crmForm.all.new_cpuproperties_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_cpuproperties").setVisible(true);

                //crmForm.all.new_storageproperties_c.style.display = 'inline';
                //crmForm.all.new_storageproperties_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_storageproperties").setVisible(true);

                //crmForm.all.new_storagecount_c.style.display = 'inline';
                //crmForm.all.new_storagecount_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_storagecount").setVisible(true);

                break;

                //Email Service
            case "{6047919B-2E78-E211-AA79-002264F9C72C}":
                setVisibleTabSection('MailService', null, true);

                //crmForm.all.new_storagepereachmailbox_c.style.display = 'inline';
                //crmForm.all.new_storagepereachmailbox_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_storagepereachmailbox").setVisible(true);

                //crmForm.all.new_packagetotalstorage_c.style.display = 'inline';
                //crmForm.all.new_packagetotalstorage_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_packagetotalstorage").setVisible(true);

                //crmForm.all.new_addon_c.style.display = 'inline';
                //crmForm.all.new_addon_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_addon").setVisible(true);

                //crmForm.all.new_dedicatedroutableip_c.style.display = 'inline';
                //crmForm.all.new_dedicatedroutableip_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_dedicatedroutableip").setVisible(true);

                //crmForm.all.new_packagetotaltafficmonthly_c.style.display = 'inline';
                //crmForm.all.new_packagetotaltafficmonthly_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_packagetotaltafficmonthly").setVisible(true);

                break;

                //سرویس ارسال و دریافت بیسیم
            case "{38B96E4E-B4EA-DD11-967D-001CC4DE83C0}":
                setVisibleTabSection('TechnicalInformation', null, true);

                //crmForm.all.new_popsiteid_c.style.display = 'inline';
                //crmForm.all.new_popsiteid_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_popsiteid").setVisible(true);

                //crmForm.all.new_circuittype_c.style.display = 'inline';
                //crmForm.all.new_circuittype_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_circuittype").setVisible(true);

                //crmForm.all.new_uplink_c.style.display = 'inline';
                //crmForm.all.new_uplink_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_uplink").setVisible(true);

                //crmForm.all.new_nightlysendbandwidth_c.style.display = 'inline';
                //crmForm.all.new_nightlysendbandwidth_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_nightlysendbandwidth").setVisible(true);

                //crmForm.all.new_nightlyrecivebandwidth_c.style.display = 'inline';
                //crmForm.all.new_nightlyrecivebandwidth_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_nightlyrecivebandwidth").setVisible(true);

                //crmForm.all.new_new_nightlyendtime_c.style.display = 'inline';
                //crmForm.all.new_new_nightlyendtime_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_new_nightlyendtime").setVisible(true);

                //crmForm.all.new_new_nightlystarttime_c.style.display = 'inline';
                //crmForm.all.new_new_nightlystarttime_d.style.display = 'inline';
                Xrm.Page.ui.controls.get("new_new_nightlystarttime").setVisible(true);

                break;

            case "{BDF8D0AA-BC4E-E411-B23D-002264F9C72C}":
                setVisibleTabSection('BandwidthInfo', null, true);
                break;

                //اجاره سرور اختصاصی ابری
            case "{52F8A303-2279-E411-B23D-002264F9C72C}":
                setVisibleTabSection('CloudRentalServer', null, true);
                break;

                //ترافیک اضافه ایمیل سازمانی           
            case "{71EE2BCC-2D78-E211-AA79-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک ایمیل سازمانی           
            case "{1064B899-455F-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک سرور اختصاصی           
            case "{BDF8D0AA-BC4E-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک سرور اختصاصی مجازی
            case "{688525A3-435F-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک میزبانی سرور(فضای رک)
            case "{169A136A-445F-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک وب هاستینگ(میزبانی سایت)
            case "{9AA2D60A-455F-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;

                //ترافیک سرور اختصاصی ابری
            case "{2297F8CE-2279-E411-B23D-002264F9C72C}":
                setVisibleTabSection('Traffic', null, true);
                break;
        }
    }

    function SetDefaultVisibilityTab() {
        setVisibleTabSection('ServerInfo', null, true);
        setVisibleTabSection('BandwidthInfo', null, true);
        setVisibleTabSection('FacilitiesInfo', null, true);
        setVisibleTabSection('WebHostingInfo', null, true);
        setVisibleTabSection('MailService', null, true);
        setVisibleTabSection('Administration', null, true);
        setVisibleTabSection('TechnicalInformation', null, true);
        setVisibleTabSection('CloudRentalServer', null, true);
        setVisibleTabSection('Traffic', null, true);

    }





    ///////////////////////////////////////////////////////Main///////////////////////////////////////////////////////////

    var productId;
    productId = GetProductId();
    SetDefaultVisibilityTab();
    if (productId != null) {
        SetControlsVisibility(productId);
    }
}
function uomid_onchange() {

}

///////////////////////////////////////////////////////////////////////////

function HasHesabdariPermission() {
    //return true; در صورتیکه دسترسی برای همه باید فعال شود این خط از کامنت در می آید
    var haspermission = 0;
    var currentUserRoles = Xrm.Page.context.getUserRoles();
    if (currentUserRoles != null) {
        for (var i = 0; i < currentUserRoles.length; i++) {
            var userRole = currentUserRoles[i];

            if (userRole.toUpperCase() == '31A43620-BEEA-4EA3-9B68-EC885BE61E22' ||
                userRole.toUpperCase() == '026738E1-880D-4E65-B3A4-376F5E193464' ||
                userRole.toUpperCase() == 'BDFCD450-FEB4-402D-82FA-F88CAC662262' ||
                userRole.toUpperCase() == 'F266BFAF-79AD-DD11-91CE-001CC4DE83C0') {
                return true;
            }
        }
    }
    return false;
}// JavaScript source code// JavaScript source code