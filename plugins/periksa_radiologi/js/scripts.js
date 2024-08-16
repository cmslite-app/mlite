jQuery().ready(function () {
    var var_tbl_periksa_radiologi = $('#tbl_periksa_radiologi').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "{?=url(['periksa_radiologi','data'])?}",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_periksa_radiologi = $('#search_field_periksa_radiologi').val();
                var search_text_periksa_radiologi = $('#search_text_periksa_radiologi').val();
                
                data.search_field_periksa_radiologi = search_field_periksa_radiologi;
                data.search_text_periksa_radiologi = search_text_periksa_radiologi;
                
            }
        },
        "fnDrawCallback": function () {
            $('#more_data_periksa_radiologi').on('click', function(e) {
                e.preventDefault();
                var clientX = e.originalEvent.clientX;
                var clientY = e.originalEvent.clientY;
                $('#tbl_periksa_radiologi tr').contextMenu({x: clientX, y: clientY});
            });          
        }, 
        "columns": [
{ 'data': 'no_rawat' },
{ 'data': 'nip' },
{ 'data': 'kd_jenis_prw' },
{ 'data': 'tgl_periksa' },
{ 'data': 'jam' },
{ 'data': 'dokter_perujuk' },
{ 'data': 'bagian_rs' },
{ 'data': 'bhp' },
{ 'data': 'tarif_perujuk' },
{ 'data': 'tarif_tindakan_dokter' },
{ 'data': 'tarif_tindakan_petugas' },
{ 'data': 'kso' },
{ 'data': 'menejemen' },
{ 'data': 'biaya' },
{ 'data': 'kd_dokter' },
{ 'data': 'status' },
{ 'data': 'proyeksi' },
{ 'data': 'kV' },
{ 'data': 'mAS' },
{ 'data': 'FFD' },
{ 'data': 'BSF' },
{ 'data': 'inak' },
{ 'data': 'jml_penyinaran' },
{ 'data': 'dosis' }

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
{ 'targets': 19},
{ 'targets': 20},
{ 'targets': 21},
{ 'targets': 22},
{ 'targets': 23}

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
        selector: '#tbl_periksa_radiologi tr', 
        trigger: 'right',
        callback: function(key, options) {
          var rowData = var_tbl_periksa_radiologi.rows({ selected: true }).data()[0];
          if (rowData != null) {
var no_rawat = rowData['no_rawat'];
            switch (key) {
                case 'detail' :
                    OpenModal(mlite.url + '/periksa_radiologi/detail/' + no_rawat + '?t=' + mlite.token);
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

    $("form[name='form_periksa_radiologi']").validate({
        rules: {
no_rawat: 'required',
nip: 'required',
kd_jenis_prw: 'required',
tgl_periksa: 'required',
jam: 'required',
dokter_perujuk: 'required',
bagian_rs: 'required',
bhp: 'required',
tarif_perujuk: 'required',
tarif_tindakan_dokter: 'required',
tarif_tindakan_petugas: 'required',
kso: 'required',
menejemen: 'required',
biaya: 'required',
kd_dokter: 'required',
status: 'required',
proyeksi: 'required',
kV: 'required',
mAS: 'required',
FFD: 'required',
BSF: 'required',
inak: 'required',
jml_penyinaran: 'required',
dosis: 'required'

        },
        messages: {
no_rawat:'No Rawat tidak boleh kosong!',
nip:'Nip tidak boleh kosong!',
kd_jenis_prw:'Kd Jenis Prw tidak boleh kosong!',
tgl_periksa:'Tgl Periksa tidak boleh kosong!',
jam:'Jam tidak boleh kosong!',
dokter_perujuk:'Dokter Perujuk tidak boleh kosong!',
bagian_rs:'Bagian Rs tidak boleh kosong!',
bhp:'Bhp tidak boleh kosong!',
tarif_perujuk:'Tarif Perujuk tidak boleh kosong!',
tarif_tindakan_dokter:'Tarif Tindakan Dokter tidak boleh kosong!',
tarif_tindakan_petugas:'Tarif Tindakan Petugas tidak boleh kosong!',
kso:'Kso tidak boleh kosong!',
menejemen:'Menejemen tidak boleh kosong!',
biaya:'Biaya tidak boleh kosong!',
kd_dokter:'Kd Dokter tidak boleh kosong!',
status:'Status tidak boleh kosong!',
proyeksi:'Proyeksi tidak boleh kosong!',
kV:'Kv tidak boleh kosong!',
mAS:'Mas tidak boleh kosong!',
FFD:'Ffd tidak boleh kosong!',
BSF:'Bsf tidak boleh kosong!',
inak:'Inak tidak boleh kosong!',
jml_penyinaran:'Jml Penyinaran tidak boleh kosong!',
dosis:'Dosis tidak boleh kosong!'

        },
        submitHandler: function (form) {
var no_rawat= $('#no_rawat').val();
var nip= $('#nip').val();
var kd_jenis_prw= $('#kd_jenis_prw').val();
var tgl_periksa= $('#tgl_periksa').val();
var jam= $('#jam').val();
var dokter_perujuk= $('#dokter_perujuk').val();
var bagian_rs= $('#bagian_rs').val();
var bhp= $('#bhp').val();
var tarif_perujuk= $('#tarif_perujuk').val();
var tarif_tindakan_dokter= $('#tarif_tindakan_dokter').val();
var tarif_tindakan_petugas= $('#tarif_tindakan_petugas').val();
var kso= $('#kso').val();
var menejemen= $('#menejemen').val();
var biaya= $('#biaya').val();
var kd_dokter= $('#kd_dokter').val();
var status= $('#status').val();
var proyeksi= $('#proyeksi').val();
var kV= $('#kV').val();
var mAS= $('#mAS').val();
var FFD= $('#FFD').val();
var BSF= $('#BSF').val();
var inak= $('#inak').val();
var jml_penyinaran= $('#jml_penyinaran').val();
var dosis= $('#dosis').val();

var typeact = $('#typeact').val();

var formData = new FormData(form); // tambahan
formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: "{?=url(['periksa_radiologi','aksi'])?}",
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
                            $("#modal_periksa_radiologi").modal('hide');
                        } else {
                            bootbox.alert('<span class="text-danger">' + data.msg + '</span>');
                        }    
                    }
                    else if (typeact == "edit") {
                        if(data.status === 'success') {
                            bootbox.alert('<span class="text-success">' + data.msg + '</span>');
                            $("#modal_periksa_radiologi").modal('hide');
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
                    var_tbl_periksa_radiologi.draw();
                }
            })
        }
    });

    if(typeof ws != 'undefined' && typeof ws.readyState != 'undefined' && ws.readyState == 1){
        ws.onmessage = function(response){
            try{
                output = JSON.parse(response.data);
                if(output['action'] == 'add'){
                    var_tbl_periksa_radiologi.draw();
                }
                if(output['action'] == 'edit'){
                    var_tbl_periksa_radiologi.draw();
                }
                if(output['action'] == 'del'){
                    var_tbl_periksa_radiologi.draw();
                }
            }catch(e){
                console.log(e);
            }
        }
    }

    // ==============================================================
    // KETIKA TOMBOL SEARCH DITEKAN
    // ==============================================================
    $('#filter_search_periksa_radiologi').click(function () {
        var_tbl_periksa_radiologi.draw();
    });

    // ===========================================
    // KETIKA TOMBOL EDIT DITEKAN
    // ===========================================

    $("#edit_data_periksa_radiologi").click(function () {
        var rowData = var_tbl_periksa_radiologi.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var no_rawat = rowData['no_rawat'];
var nip = rowData['nip'];
var kd_jenis_prw = rowData['kd_jenis_prw'];
var tgl_periksa = rowData['tgl_periksa'];
var jam = rowData['jam'];
var dokter_perujuk = rowData['dokter_perujuk'];
var bagian_rs = rowData['bagian_rs'];
var bhp = rowData['bhp'];
var tarif_perujuk = rowData['tarif_perujuk'];
var tarif_tindakan_dokter = rowData['tarif_tindakan_dokter'];
var tarif_tindakan_petugas = rowData['tarif_tindakan_petugas'];
var kso = rowData['kso'];
var menejemen = rowData['menejemen'];
var biaya = rowData['biaya'];
var kd_dokter = rowData['kd_dokter'];
var status = rowData['status'];
var proyeksi = rowData['proyeksi'];
var kV = rowData['kV'];
var mAS = rowData['mAS'];
var FFD = rowData['FFD'];
var BSF = rowData['BSF'];
var inak = rowData['inak'];
var jml_penyinaran = rowData['jml_penyinaran'];
var dosis = rowData['dosis'];

            $("#typeact").val("edit");
  
            $('#no_rawat').val(no_rawat);
$('#nip').val(nip);
$('#kd_jenis_prw').val(kd_jenis_prw);
$('#tgl_periksa').val(tgl_periksa);
$('#jam').val(jam);
$('#dokter_perujuk').val(dokter_perujuk);
$('#bagian_rs').val(bagian_rs);
$('#bhp').val(bhp);
$('#tarif_perujuk').val(tarif_perujuk);
$('#tarif_tindakan_dokter').val(tarif_tindakan_dokter);
$('#tarif_tindakan_petugas').val(tarif_tindakan_petugas);
$('#kso').val(kso);
$('#menejemen').val(menejemen);
$('#biaya').val(biaya);
$('#kd_dokter').val(kd_dokter);
$('#status').val(status);
$('#proyeksi').val(proyeksi);
$('#kV').val(kV);
$('#mAS').val(mAS);
$('#FFD').val(FFD);
$('#BSF').val(BSF);
$('#inak').val(inak);
$('#jml_penyinaran').val(jml_penyinaran);
$('#dosis').val(dosis);

            $("#no_rawat").prop('readonly', true); // GA BISA DIEDIT KALI READONLY
            $('#modal-title').text("Edit Data Periksa Radiologi");
            $("#modal_periksa_radiologi").modal('show');
        }
        else {
            bootbox.alert("Silakan pilih data yang akan di edit.");
        }

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_periksa_radiologi").click(function () {
        var rowData = var_tbl_periksa_radiologi.rows({ selected: true }).data()[0];


        if (rowData) {
var no_rawat = rowData['no_rawat'];
            bootbox.confirm('Anda yakin akan menghapus data dengan no_rawat="' + no_rawat, function(result) {
                if(result) {
                    $.ajax({
                        url: "{?=url(['periksa_radiologi','aksi'])?}",
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
                            var_tbl_periksa_radiologi.draw();
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
    jQuery("#tambah_data_periksa_radiologi").click(function () {

        $('#no_rawat').val('');
$('#nip').val('');
$('#kd_jenis_prw').val('');
$('#tgl_periksa').val('');
$('#jam').val('');
$('#dokter_perujuk').val('');
$('#bagian_rs').val('');
$('#bhp').val('');
$('#tarif_perujuk').val('');
$('#tarif_tindakan_dokter').val('');
$('#tarif_tindakan_petugas').val('');
$('#kso').val('');
$('#menejemen').val('');
$('#biaya').val('');
$('#kd_dokter').val('');
$('#status').val('');
$('#proyeksi').val('');
$('#kV').val('');
$('#mAS').val('');
$('#FFD').val('');
$('#BSF').val('');
$('#inak').val('');
$('#jml_penyinaran').val('');
$('#dosis').val('');

        $("#typeact").val("add");
        $("#no_rawat").prop('readonly', false);
        
        $('#modal-title').text("Tambah Data Periksa Radiologi");
        $("#modal_periksa_radiologi").modal('show');
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_periksa_radiologi").click(function () {

        var search_field_periksa_radiologi = $('#search_field_periksa_radiologi').val();
        var search_text_periksa_radiologi = $('#search_text_periksa_radiologi').val();

        $.ajax({
            url: "{?=url(['periksa_radiologi','aksi'])?}",
            method: "POST",
            data: {
                typeact: 'lihat', 
                search_field_periksa_radiologi: search_field_periksa_radiologi, 
                search_text_periksa_radiologi: search_text_periksa_radiologi
            },
            dataType: 'json',
            success: function (res) {
                var eTable = "<div class='table-responsive'><table id='tbl_lihat_periksa_radiologi' class='table display dataTable' style='width:100%'><thead><th>No Rawat</th><th>Nip</th><th>Kd Jenis Prw</th><th>Tgl Periksa</th><th>Jam</th><th>Dokter Perujuk</th><th>Bagian Rs</th><th>Bhp</th><th>Tarif Perujuk</th><th>Tarif Tindakan Dokter</th><th>Tarif Tindakan Petugas</th><th>Kso</th><th>Menejemen</th><th>Biaya</th><th>Kd Dokter</th><th>Status</th><th>Proyeksi</th><th>Kv</th><th>Mas</th><th>Ffd</th><th>Bsf</th><th>Inak</th><th>Jml Penyinaran</th><th>Dosis</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['no_rawat'] + '</td>';
eTable += '<td>' + res[i]['nip'] + '</td>';
eTable += '<td>' + res[i]['kd_jenis_prw'] + '</td>';
eTable += '<td>' + res[i]['tgl_periksa'] + '</td>';
eTable += '<td>' + res[i]['jam'] + '</td>';
eTable += '<td>' + res[i]['dokter_perujuk'] + '</td>';
eTable += '<td>' + res[i]['bagian_rs'] + '</td>';
eTable += '<td>' + res[i]['bhp'] + '</td>';
eTable += '<td>' + res[i]['tarif_perujuk'] + '</td>';
eTable += '<td>' + res[i]['tarif_tindakan_dokter'] + '</td>';
eTable += '<td>' + res[i]['tarif_tindakan_petugas'] + '</td>';
eTable += '<td>' + res[i]['kso'] + '</td>';
eTable += '<td>' + res[i]['menejemen'] + '</td>';
eTable += '<td>' + res[i]['biaya'] + '</td>';
eTable += '<td>' + res[i]['kd_dokter'] + '</td>';
eTable += '<td>' + res[i]['status'] + '</td>';
eTable += '<td>' + res[i]['proyeksi'] + '</td>';
eTable += '<td>' + res[i]['kV'] + '</td>';
eTable += '<td>' + res[i]['mAS'] + '</td>';
eTable += '<td>' + res[i]['FFD'] + '</td>';
eTable += '<td>' + res[i]['BSF'] + '</td>';
eTable += '<td>' + res[i]['inak'] + '</td>';
eTable += '<td>' + res[i]['jml_penyinaran'] + '</td>';
eTable += '<td>' + res[i]['dosis'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table></div>";
                $('#forTable_periksa_radiologi').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data");
        $("#modal_lihat_periksa_radiologi").modal('show');
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
        doc.text("Tabel Data Periksa Radiologi", 20, 95, null, null, null);
        const totalPagesExp = "{total_pages_count_string}";        
        doc.autoTable({
            html: '#tbl_lihat_periksa_radiologi',
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
        // doc.save('table_data_periksa_radiologi.pdf');
        window.open(doc.output('bloburl'), '_blank',"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes");  
              
    })

    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_lihat_periksa_radiologi");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data periksa_radiologi");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })

    $("#view_chart").click(function () {
        window.open(mlite.url + '/periksa_radiologi/chart?t=' + mlite.token, '_blank',"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes");  
    })   

});