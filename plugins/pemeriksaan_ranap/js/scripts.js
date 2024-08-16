jQuery().ready(function () {
    var var_tbl_pemeriksaan_ranap = $('#tbl_pemeriksaan_ranap').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "{?=url(['pemeriksaan_ranap','data'])?}",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_pemeriksaan_ranap = $('#search_field_pemeriksaan_ranap').val();
                var search_text_pemeriksaan_ranap = $('#search_text_pemeriksaan_ranap').val();
                
                data.search_field_pemeriksaan_ranap = search_field_pemeriksaan_ranap;
                data.search_text_pemeriksaan_ranap = search_text_pemeriksaan_ranap;
                
            }
        },
        "fnDrawCallback": function () {
            $('#more_data_pemeriksaan_ranap').on('click', function(e) {
                e.preventDefault();
                var clientX = e.originalEvent.clientX;
                var clientY = e.originalEvent.clientY;
                $('#tbl_pemeriksaan_ranap tr').contextMenu({x: clientX, y: clientY});
            });          
        }, 
        "columns": [
{ 'data': 'no_rawat' },
{ 'data': 'tgl_perawatan' },
{ 'data': 'jam_rawat' },
{ 'data': 'suhu_tubuh' },
{ 'data': 'tensi' },
{ 'data': 'nadi' },
{ 'data': 'respirasi' },
{ 'data': 'tinggi' },
{ 'data': 'berat' },
{ 'data': 'spo2' },
{ 'data': 'gcs' },
{ 'data': 'kesadaran' },
{ 'data': 'keluhan' },
{ 'data': 'pemeriksaan' },
{ 'data': 'alergi' },
{ 'data': 'penilaian' },
{ 'data': 'rtl' },
{ 'data': 'instruksi' },
{ 'data': 'evaluasi' },
{ 'data': 'nip' }

        ],
        "columnDefs": [
{ 'targets': 0},
{ 'targets': 1},
{ 'targets': 2},
{ 'targets': 3},
{ 'targets': 4},
{ 'targets': 5},
{ 'targets': 6},
{ 'targets': 7},
{ 'targets': 8},
{ 'targets': 9},
{ 'targets': 10},
{ 'targets': 11},
{ 'targets': 12},
{ 'targets': 13},
{ 'targets': 14},
{ 'targets': 15},
{ 'targets': 16},
{ 'targets': 17},
{ 'targets': 18},
{ 'targets': 19}

        ],
        order: [[1, 'DESC']], 
        buttons: [],
        "scrollCollapse": true,
        // "scrollY": '48vh', 
        // "pageLength":'25', 
        "lengthChange": true,
        "scrollX": true,
        dom: "<'row'<'col-sm-12'tr>><<'pmd-datatable-pagination' l i p>>"
    });


    $.contextMenu({
        selector: '#tbl_pemeriksaan_ranap tr', 
        trigger: 'right',
        callback: function(key, options) {
          var rowData = var_tbl_pemeriksaan_ranap.rows({ selected: true }).data()[0];
          if (rowData != null) {
var no_rawat = rowData['no_rawat'];
            switch (key) {
                case 'detail' :
                    OpenModal(mlite.url + '/pemeriksaan_ranap/detail/' + no_rawat + '?t=' + mlite.token);
                break;
                default :
                break
            } 
          } else {
            bootbox.alert("Silakan pilih data atau klik baris data.");            
          }          
        },
        items: {
            "detail": {name: "View Detail", "icon": "edit", disabled:  {$disabled_menu.read}}
        }
    });

    // ==============================================================
    // FORM VALIDASI
    // ==============================================================

    $("form[name='form_pemeriksaan_ranap']").validate({
        rules: {
no_rawat: 'required',
tgl_perawatan: 'required',
jam_rawat: 'required',
suhu_tubuh: 'required',
tensi: 'required',
nadi: 'required',
respirasi: 'required',
tinggi: 'required',
berat: 'required',
spo2: 'required',
gcs: 'required',
kesadaran: 'required',
keluhan: 'required',
pemeriksaan: 'required',
alergi: 'required',
penilaian: 'required',
rtl: 'required',
instruksi: 'required',
evaluasi: 'required',
nip: 'required'

        },
        messages: {
no_rawat:'No Rawat tidak boleh kosong!',
tgl_perawatan:'Tgl Perawatan tidak boleh kosong!',
jam_rawat:'Jam Rawat tidak boleh kosong!',
suhu_tubuh:'Suhu Tubuh tidak boleh kosong!',
tensi:'Tensi tidak boleh kosong!',
nadi:'Nadi tidak boleh kosong!',
respirasi:'Respirasi tidak boleh kosong!',
tinggi:'Tinggi tidak boleh kosong!',
berat:'Berat tidak boleh kosong!',
spo2:'Spo2 tidak boleh kosong!',
gcs:'Gcs tidak boleh kosong!',
kesadaran:'Kesadaran tidak boleh kosong!',
keluhan:'Keluhan tidak boleh kosong!',
pemeriksaan:'Pemeriksaan tidak boleh kosong!',
alergi:'Alergi tidak boleh kosong!',
penilaian:'Penilaian tidak boleh kosong!',
rtl:'Rtl tidak boleh kosong!',
instruksi:'Instruksi tidak boleh kosong!',
evaluasi:'Evaluasi tidak boleh kosong!',
nip:'Nip tidak boleh kosong!'

        },
        submitHandler: function (form) {
var no_rawat= $('#no_rawat').val();
var tgl_perawatan= $('#tgl_perawatan').val();
var jam_rawat= $('#jam_rawat').val();
var suhu_tubuh= $('#suhu_tubuh').val();
var tensi= $('#tensi').val();
var nadi= $('#nadi').val();
var respirasi= $('#respirasi').val();
var tinggi= $('#tinggi').val();
var berat= $('#berat').val();
var spo2= $('#spo2').val();
var gcs= $('#gcs').val();
var kesadaran= $('#kesadaran').val();
var keluhan= $('#keluhan').val();
var pemeriksaan= $('#pemeriksaan').val();
var alergi= $('#alergi').val();
var penilaian= $('#penilaian').val();
var rtl= $('#rtl').val();
var instruksi= $('#instruksi').val();
var evaluasi= $('#evaluasi').val();
var nip= $('#nip').val();

var typeact = $('#typeact').val();

var formData = new FormData(form); // tambahan
formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: "{?=url(['pemeriksaan_ranap','aksi'])?}",
                method: "POST",
                contentType: false, // tambahan
                processData: false, // tambahan
                data: formData,
                success: function (data) {
                    data = JSON.parse(data);
                    var audio = new Audio('{?=url()?}/assets/sound/' + data.status + '.mp3');
                    audio.play();
                    if (typeact == "add") {
                        if(data.status === 'success') {
                            bootbox.alert('<span class="text-success">' + data.msg + '</span>');
                            $("#modal_pemeriksaan_ranap").modal('hide');
                        } else {
                            bootbox.alert('<span class="text-danger">' + data.msg + '</span>');
                        }    
                    }
                    else if (typeact == "edit") {
                        if(data.status === 'success') {
                            bootbox.alert('<span class="text-success">' + data.msg + '</span>');
                            $("#modal_pemeriksaan_ranap").modal('hide');
                        } else {
                            bootbox.alert('<span class="text-danger">' + data.msg + '</span>');
                        }    
                    }
                    if(typeof ws != 'undefined' && typeof ws.readyState != 'undefined' && ws.readyState == 1){
                        let payload = {
                            'action' : typeact
                        }
                        ws.send(JSON.stringify(payload));
                    } 
                    var_tbl_pemeriksaan_ranap.draw();
                }
            })
        }
    });

    if(typeof ws != 'undefined' && typeof ws.readyState != 'undefined' && ws.readyState == 1){
        ws.onmessage = function(response){
            try{
                output = JSON.parse(response.data);
                if(output['action'] == 'add'){
                    var_tbl_pemeriksaan_ranap.draw();
                }
                if(output['action'] == 'edit'){
                    var_tbl_pemeriksaan_ranap.draw();
                }
                if(output['action'] == 'del'){
                    var_tbl_pemeriksaan_ranap.draw();
                }
            }catch(e){
                console.log(e);
            }
        }
    }

    // ==============================================================
    // KETIKA TOMBOL SEARCH DITEKAN
    // ==============================================================
    $('#filter_search_pemeriksaan_ranap').click(function () {
        var_tbl_pemeriksaan_ranap.draw();
    });

    // ===========================================
    // KETIKA TOMBOL EDIT DITEKAN
    // ===========================================

    $("#edit_data_pemeriksaan_ranap").click(function () {
        var rowData = var_tbl_pemeriksaan_ranap.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var no_rawat = rowData['no_rawat'];
var tgl_perawatan = rowData['tgl_perawatan'];
var jam_rawat = rowData['jam_rawat'];
var suhu_tubuh = rowData['suhu_tubuh'];
var tensi = rowData['tensi'];
var nadi = rowData['nadi'];
var respirasi = rowData['respirasi'];
var tinggi = rowData['tinggi'];
var berat = rowData['berat'];
var spo2 = rowData['spo2'];
var gcs = rowData['gcs'];
var kesadaran = rowData['kesadaran'];
var keluhan = rowData['keluhan'];
var pemeriksaan = rowData['pemeriksaan'];
var alergi = rowData['alergi'];
var penilaian = rowData['penilaian'];
var rtl = rowData['rtl'];
var instruksi = rowData['instruksi'];
var evaluasi = rowData['evaluasi'];
var nip = rowData['nip'];

            $("#typeact").val("edit");
  
            $('#no_rawat').val(no_rawat);
$('#tgl_perawatan').val(tgl_perawatan);
$('#jam_rawat').val(jam_rawat);
$('#suhu_tubuh').val(suhu_tubuh);
$('#tensi').val(tensi);
$('#nadi').val(nadi);
$('#respirasi').val(respirasi);
$('#tinggi').val(tinggi);
$('#berat').val(berat);
$('#spo2').val(spo2);
$('#gcs').val(gcs);
$('#kesadaran').val(kesadaran);
$('#keluhan').val(keluhan);
$('#pemeriksaan').val(pemeriksaan);
$('#alergi').val(alergi);
$('#penilaian').val(penilaian);
$('#rtl').val(rtl);
$('#instruksi').val(instruksi);
$('#evaluasi').val(evaluasi);
$('#nip').val(nip);

            $("#no_rawat").prop('readonly', true); // GA BISA DIEDIT KALI READONLY
            $('#modal-title').text("Edit Data Pemeriksaan Ranap");
            $("#modal_pemeriksaan_ranap").modal('show');
        }
        else {
            bootbox.alert("Silakan pilih data yang akan di edit.");
        }

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_pemeriksaan_ranap").click(function () {
        var rowData = var_tbl_pemeriksaan_ranap.rows({ selected: true }).data()[0];


        if (rowData) {
var no_rawat = rowData['no_rawat'];
            bootbox.confirm('Anda yakin akan menghapus data dengan no_rawat="' + no_rawat, function(result) {
                if(result) {
                    $.ajax({
                        url: "{?=url(['pemeriksaan_ranap','aksi'])?}",
                        method: "POST",
                        data: {
                            no_rawat: no_rawat,
                            typeact: 'del'
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            var audio = new Audio('{?=url()?}/assets/sound/' + data.status + '.mp3');
                            audio.play();
                            if(data.status === 'success') {
                                bootbox.alert('<span class="text-success">' + data.msg + '</span>');
                            } else {
                                bootbox.alert('<span class="text-danger">' + data.msg + '</span>');
                            } 
                            if(typeof ws != 'undefined' && typeof ws.readyState != 'undefined' && ws.readyState == 1){
                                let payload = {
                                    'action' : 'del'
                                }
                                ws.send(JSON.stringify(payload));
                            }
                            var_tbl_pemeriksaan_ranap.draw();
                        }
                    })    
                }
            });

        }
        else {
            bootbox.alert("Pilih satu baris untuk dihapus");
        }
    });

    // ==============================================================
    // TOMBOL TAMBAH DATA DI CLICK
    // ==============================================================
    jQuery("#tambah_data_pemeriksaan_ranap").click(function () {

        $('#no_rawat').val('');
$('#tgl_perawatan').val('');
$('#jam_rawat').val('');
$('#suhu_tubuh').val('');
$('#tensi').val('');
$('#nadi').val('');
$('#respirasi').val('');
$('#tinggi').val('');
$('#berat').val('');
$('#spo2').val('');
$('#gcs').val('');
$('#kesadaran').val('');
$('#keluhan').val('');
$('#pemeriksaan').val('');
$('#alergi').val('');
$('#penilaian').val('');
$('#rtl').val('');
$('#instruksi').val('');
$('#evaluasi').val('');
$('#nip').val('');

        $("#typeact").val("add");
        $("#no_rawat").prop('readonly', false);
        
        $('#modal-title').text("Tambah Data Pemeriksaan Ranap");
        $("#modal_pemeriksaan_ranap").modal('show');
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_pemeriksaan_ranap").click(function () {

        var search_field_pemeriksaan_ranap = $('#search_field_pemeriksaan_ranap').val();
        var search_text_pemeriksaan_ranap = $('#search_text_pemeriksaan_ranap').val();

        $.ajax({
            url: "{?=url(['pemeriksaan_ranap','aksi'])?}",
            method: "POST",
            data: {
                typeact: 'lihat', 
                search_field_pemeriksaan_ranap: search_field_pemeriksaan_ranap, 
                search_text_pemeriksaan_ranap: search_text_pemeriksaan_ranap
            },
            dataType: 'json',
            success: function (res) {
                var eTable = "<div class='table-responsive'><table id='tbl_lihat_pemeriksaan_ranap' class='table display dataTable' style='width:100%'><thead><th>No Rawat</th><th>Tgl Perawatan</th><th>Jam Rawat</th><th>Suhu Tubuh</th><th>Tensi</th><th>Nadi</th><th>Respirasi</th><th>Tinggi</th><th>Berat</th><th>Spo2</th><th>Gcs</th><th>Kesadaran</th><th>Keluhan</th><th>Pemeriksaan</th><th>Alergi</th><th>Penilaian</th><th>Rtl</th><th>Instruksi</th><th>Evaluasi</th><th>Nip</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['no_rawat'] + '</td>';
eTable += '<td>' + res[i]['tgl_perawatan'] + '</td>';
eTable += '<td>' + res[i]['jam_rawat'] + '</td>';
eTable += '<td>' + res[i]['suhu_tubuh'] + '</td>';
eTable += '<td>' + res[i]['tensi'] + '</td>';
eTable += '<td>' + res[i]['nadi'] + '</td>';
eTable += '<td>' + res[i]['respirasi'] + '</td>';
eTable += '<td>' + res[i]['tinggi'] + '</td>';
eTable += '<td>' + res[i]['berat'] + '</td>';
eTable += '<td>' + res[i]['spo2'] + '</td>';
eTable += '<td>' + res[i]['gcs'] + '</td>';
eTable += '<td>' + res[i]['kesadaran'] + '</td>';
eTable += '<td>' + res[i]['keluhan'] + '</td>';
eTable += '<td>' + res[i]['pemeriksaan'] + '</td>';
eTable += '<td>' + res[i]['alergi'] + '</td>';
eTable += '<td>' + res[i]['penilaian'] + '</td>';
eTable += '<td>' + res[i]['rtl'] + '</td>';
eTable += '<td>' + res[i]['instruksi'] + '</td>';
eTable += '<td>' + res[i]['evaluasi'] + '</td>';
eTable += '<td>' + res[i]['nip'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table></div>";
                $('#forTable_pemeriksaan_ranap').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data");
        $("#modal_lihat_pemeriksaan_ranap").modal('show');
    });
        
    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4'); /* pilih 'l' atau 'p' */
        var img = "{?=base64_encode(file_get_contents(url($settings['logo'])))?}";
        doc.addImage(img, 'JPEG', 20, 10, 50, 50);
        doc.setFontSize(20);
        doc.text("{$settings.nama_instansi}", 80, 35, null, null, null);
        doc.setFontSize(10);
        doc.text("{$settings.alamat} - {$settings.kota} - {$settings.propinsi}", 80, 46, null, null, null);
        doc.text("Telepon: {$settings.nomor_telepon} - Email: {$settings.email}", 80, 56, null, null, null);
        doc.line(20,70,572,70,null); /* doc.line(20,70,820,70,null); --> Jika landscape */
        doc.line(20,72,572,72,null); /* doc.line(20,72,820,72,null); --> Jika landscape */
        doc.setFontSize(14);
        doc.text("Tabel Data Pemeriksaan Ranap", 20, 95, null, null, null);
        const totalPagesExp = "{total_pages_count_string}";        
        doc.autoTable({
            html: '#tbl_lihat_pemeriksaan_ranap',
            startY: 105,
            margin: {
                left: 20, 
                right: 20
            }, 
            styles: {
                fontSize: 10,
                cellPadding: 5
            }, 
            didDrawPage: data => {
                let footerStr = "Page " + doc.internal.getNumberOfPages();
                if (typeof doc.putTotalPages === 'function') {
                footerStr = footerStr + " of " + totalPagesExp;
                }
                doc.setFontSize(10);
                doc.text(`© ${new Date().getFullYear()} {$settings.nama_instansi}.`, data.settings.margin.left, doc.internal.pageSize.height - 10);                
                doc.text(footerStr, data.settings.margin.left + 480, doc.internal.pageSize.height - 10);
           }
        });
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        // doc.save('table_data_pemeriksaan_ranap.pdf');
        window.open(doc.output('bloburl'), '_blank',"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes");  
              
    })

    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_lihat_pemeriksaan_ranap");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data pemeriksaan_ranap");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })

    $("#view_chart").click(function () {
        window.open(mlite.url + '/pemeriksaan_ranap/chart?t=' + mlite.token, '_blank',"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes");  
    })   

});