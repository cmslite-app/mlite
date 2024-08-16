<?php
namespace Plugins\Permintaan_Perbaikan_Inventaris;

use Systems\AdminModule;

class Admin extends AdminModule
{

    public function navigation()
    {
        return [
            'Kelola'   => 'manage',
        ];
    }

    public function getManage()
    {
        $this->_addHeaderFiles();
        $disabled_menu = $this->core->loadDisabledMenu('permintaan_perbaikan_inventaris'); 
        foreach ($disabled_menu as &$row) { 
          if ($row == "true" ) $row = "disabled"; 
        } 
        unset($row);
        return $this->draw('manage.html', ['disabled_menu' => $disabled_menu]);
    }

    public function postData()
    {
        $column_name = isset_or($_POST['column_name'], 'no_permintaan');
        $column_order = isset_or($_POST['column_order'], 'asc');
        $draw = isset_or($_POST['draw'], '0');
        $row1 = isset_or($_POST['start'], '0');
        $rowperpage = isset_or($_POST['length'], '10'); // Rows display per page
        $columnIndex = isset_or($_POST['order'][0]['column']); // Column index
        $columnName = isset_or($_POST['columns'][$columnIndex]['data'], $column_name); // Column name
        $columnSortOrder = isset_or($_POST['order'][0]['dir'], $column_order); // asc or desc
        $searchValue = isset_or($_POST['search']['value']); // Search value

        ## Custom Field value
        $search_field_permintaan_perbaikan_inventaris= isset_or($_POST['search_field_permintaan_perbaikan_inventaris']);
        $search_text_permintaan_perbaikan_inventaris = isset_or($_POST['search_text_permintaan_perbaikan_inventaris']);

        if ($search_text_permintaan_perbaikan_inventaris != '') {
          $where[$search_field_permintaan_perbaikan_inventaris.'[~]'] = $search_text_permintaan_perbaikan_inventaris;
          $where = ["AND" => $where];
        } else {
          $where = [];
        }

        ## Total number of records without filtering
        $totalRecords = $this->core->db->count('permintaan_perbaikan_inventaris', '*');

        ## Total number of records with filtering
        $totalRecordwithFilter = $this->core->db->count('permintaan_perbaikan_inventaris', '*', $where);

        ## Fetch records
        $where['ORDER'] = [$columnName => strtoupper($columnSortOrder)];
        $where['LIMIT'] = [$row1, $rowperpage];
        $result = $this->core->db->select('permintaan_perbaikan_inventaris', '*', $where);

        $data = array();
        foreach($result as $row) {
            $data[] = array(
                'no_permintaan'=>$row['no_permintaan'],
'no_inventaris'=>$row['no_inventaris'],
'nik'=>$row['nik'],
'tanggal'=>$row['tanggal'],
'deskripsi_kerusakan'=>$row['deskripsi_kerusakan']

            );
        }

        ## Response
        http_response_code(200);
        $response = array(
            "draw" => intval($draw), 
            "iTotalRecords" => $totalRecords,
            "iTotalDisplayRecords" => $totalRecordwithFilter,
            "aaData" => $data
        );

        if($this->settings('settings', 'logquery') == true) {
          $this->core->LogQuery('permintaan_perbaikan_inventaris => postData');
        }

        echo json_encode($response);
        exit();
    }

    public function postAksi()
    {
        if(isset($_POST['typeact'])){ 
            $act = $_POST['typeact']; 
        }else{ 
            $act = ''; 
        }

        if ($act=='add') {

            if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['create'] == 'true') {
              http_response_code(403);
              $data = array(
                'code' => '403', 
                'status' => 'error', 
                'msg' => 'Maaf, akses dibatasi!'
              );
              echo json_encode($data);    
              exit();
            }

        $no_permintaan = $_POST['no_permintaan'];
$no_inventaris = $_POST['no_inventaris'];
$nik = $_POST['nik'];
$tanggal = $_POST['tanggal'];
$deskripsi_kerusakan = $_POST['deskripsi_kerusakan'];

            
            $result = $this->core->db->insert('permintaan_perbaikan_inventaris', [
'no_permintaan'=>$no_permintaan, 'no_inventaris'=>$no_inventaris, 'nik'=>$nik, 'tanggal'=>$tanggal, 'deskripsi_kerusakan'=>$deskripsi_kerusakan
            ]);


            if (!empty($result)){
              http_response_code(200);
              $data = array(
                'code' => '200', 
                'status' => 'success', 
                'msg' => 'Data telah ditambah'
              );
            } else {
              http_response_code(201);
              $data = array(
                'code' => '201', 
                'status' => 'error', 
                'msg' => $this->core->db->errorInfo[2]
              );
            }

            if($this->settings('settings', 'logquery') == true) {
              $this->core->LogQuery('permintaan_perbaikan_inventaris => postAksi => add');
            }

            echo json_encode($data);    
        }
        if ($act=="edit") {

            if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['update'] == 'true') {
              http_response_code(403);
              $data = array(
                'code' => '403', 
                'status' => 'error', 
                'msg' => 'Maaf, akses dibatasi!'
              );
              echo json_encode($data);    
              exit();
            }

        $no_permintaan = $_POST['no_permintaan'];
$no_inventaris = $_POST['no_inventaris'];
$nik = $_POST['nik'];
$tanggal = $_POST['tanggal'];
$deskripsi_kerusakan = $_POST['deskripsi_kerusakan'];


        // BUANG FIELD PERTAMA

            $result = $this->core->db->update('permintaan_perbaikan_inventaris', [
'no_permintaan'=>$no_permintaan, 'no_inventaris'=>$no_inventaris, 'nik'=>$nik, 'tanggal'=>$tanggal, 'deskripsi_kerusakan'=>$deskripsi_kerusakan
            ], [
              'no_permintaan'=>$no_permintaan
            ]);


            if (!empty($result)){
              http_response_code(200);
              $data = array(
                'code' => '200', 
                'status' => 'success', 
                'msg' => 'Data telah diubah'
              );
            } else {
              http_response_code(201);
              $data = array(
                'code' => '201', 
                'status' => 'error', 
                'msg' => $this->core->db->errorInfo[2]
              );
            }

            if($this->settings('settings', 'logquery') == true) {
              $this->core->LogQuery('permintaan_perbaikan_inventaris => postAksi => edit');
            }

            echo json_encode($data);             
        }

        if ($act=="del") {

            if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['delete'] == 'true') {
              http_response_code(403);
              $data = array(
                'code' => '403', 
                'status' => 'error', 
                'msg' => 'Maaf, akses dibatasi!'
              );
              echo json_encode($data);    
              exit();
            }

            $no_permintaan= $_POST['no_permintaan'];
            $result = $this->core->db->delete('permintaan_perbaikan_inventaris', [
              'AND' => [
                'no_permintaan'=>$no_permintaan
              ]
            ]);

            if (!empty($result)){
              http_response_code(200);
              $data = array(
                'code' => '200', 
                'status' => 'success', 
                'msg' => 'Data telah dihapus'
              );
            } else {
              http_response_code(201);
              $data = array(
                'code' => '201', 
                'status' => 'error', 
                'msg' => $this->core->db->errorInfo[2]
              );
            }

            if($this->settings('settings', 'logquery') == true) {
              $this->core->LogQuery('permintaan_perbaikan_inventaris => postAksi => del');
            }

            echo json_encode($data);                    
        }

        if ($act=="lihat") {

            if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['read'] == 'true') {
              http_response_code(403);
              $data = array(
                'code' => '403', 
                'status' => 'error', 
                'msg' => 'Maaf, akses dibatasi!'
              );
              echo json_encode($data);    
              exit();
            }

            $search_field_permintaan_perbaikan_inventaris= $_POST['search_field_permintaan_perbaikan_inventaris'];
            $search_text_permintaan_perbaikan_inventaris = $_POST['search_text_permintaan_perbaikan_inventaris'];

            if ($search_text_permintaan_perbaikan_inventaris != '') {
              $where[$search_field_permintaan_perbaikan_inventaris.'[~]'] = $search_text_permintaan_perbaikan_inventaris;
              $where = ["AND" => $where];
            } else {
              $where = [];
            }

            ## Fetch records
            $result = $this->core->db->select('permintaan_perbaikan_inventaris', '*', $where);

            $data = array();
            foreach($result as $row) {
                $data[] = array(
                    'no_permintaan'=>$row['no_permintaan'],
'no_inventaris'=>$row['no_inventaris'],
'nik'=>$row['nik'],
'tanggal'=>$row['tanggal'],
'deskripsi_kerusakan'=>$row['deskripsi_kerusakan']
                );
            }

            if($this->settings('settings', 'logquery') == true) {
              $this->core->LogQuery('permintaan_perbaikan_inventaris => postAksi => lihat');
            }
            
            echo json_encode($data);
        }
        exit();
    }

    public function getRead($no_permintaan)
    {

        if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['read'] == 'true') {
          http_response_code(403);
          $data = array(
            'code' => '403', 
            'status' => 'error', 
            'msg' => 'Maaf, akses dibatasi!'
          );
          echo json_encode($data);    
          exit();
        }

        $result =  $this->core->db->get('permintaan_perbaikan_inventaris', '*', ['no_permintaan' => $no_permintaan]);

        if (!empty($result)){
          http_response_code(200);
          $data = array(
            'code' => '200', 
            'status' => 'success', 
            'msg' => $result
          );
        } else {
          http_response_code(201);
          $data = array(
            'code' => '201', 
            'status' => 'error', 
            'msg' => 'Data tidak ditemukan'
          );
        }

        if($this->settings('settings', 'logquery') == true) {
          $this->core->LogQuery('permintaan_perbaikan_inventaris => getRead');
        }

        echo json_encode($data);        
        exit();
    }

    public function getDetail($no_permintaan)
    {

        if($this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')['read'] == 'true') {
          http_response_code(403);
          $data = array(
            'code' => '403', 
            'status' => 'error', 
            'msg' => 'Maaf, akses dibatasi!'
          );
          echo json_encode($data);    
          exit();
        }

        $settings =  $this->settings('settings');

        if($this->settings('settings', 'logquery') == true) {
          $this->core->LogQuery('permintaan_perbaikan_inventaris => getDetail');
        }

        echo $this->draw('detail.html', ['settings' => $settings, 'no_permintaan' => $no_permintaan]);
        exit();
    }

    public function getChart($type = '', $column = '')
    {
      if($type == ''){
        $type = 'pie';
      }

      $labels = $this->core->db->select('permintaan_perbaikan_inventaris', 'nik', ['GROUP' => 'nik']);
      $datasets = $this->core->db->select('permintaan_perbaikan_inventaris', ['count' => \Medoo\Medoo::raw('COUNT(<nik>)')], ['GROUP' => 'nik']);

      if(isset_or($column)) {
        $labels = $this->core->db->select('permintaan_perbaikan_inventaris', ''.$column.'', ['GROUP' => ''.$column.'']);
        $datasets = $this->core->db->select('permintaan_perbaikan_inventaris', ['count' => \Medoo\Medoo::raw('COUNT(<'.$column.'>)')], ['GROUP' => ''.$column.'']);          
      }

      $database = DBNAME;
      $nama_table = 'permintaan_perbaikan_inventaris';

      $get_table = $this->core->db->pdo->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='$database' AND TABLE_NAME='$nama_table'");
	    $get_table->execute();
	    $result = $get_table->fetchAll();

      if($this->settings('settings', 'logquery') == true) {
        $this->core->LogQuery('permintaan_perbaikan_inventaris => getChart');
      }

      echo $this->draw('chart.html', ['type' => $type, 'column' => $result, 'labels' => json_encode($labels), 'datasets' => json_encode(array_column($datasets, 'count'))]);
      exit();
    }

    public function getCss()
    {
        header('Content-type: text/css');
        echo $this->draw(MODULES.'/permintaan_perbaikan_inventaris/css/styles.css');
        exit();
    }

    public function getJavascript()
    {
        header('Content-type: text/javascript');
        $settings = $this->settings('settings');
        echo $this->draw(MODULES.'/permintaan_perbaikan_inventaris/js/scripts.js', ['settings' => $settings, 'disabled_menu' => $this->core->loadDisabledMenu('permintaan_perbaikan_inventaris')]);
        exit();
    }

    private function _addHeaderFiles()
    {
        $this->core->addCSS(url('assets/vendor/datatables/datatables.min.css'));
        $this->core->addCSS(url('assets/css/jquery.contextMenu.css'));
        $this->core->addJS(url('assets/js/jqueryvalidation.js'), 'footer');
        $this->core->addJS(url('assets/vendor/jspdf/xlsx.js'), 'footer');
        $this->core->addJS(url('assets/vendor/jspdf/jspdf.min.js'), 'footer');
        $this->core->addJS(url('assets/vendor/jspdf/jspdf.plugin.autotable.min.js'), 'footer');
        $this->core->addJS(url('assets/vendor/datatables/datatables.min.js'), 'footer');
        $this->core->addJS(url('assets/js/jquery.contextMenu.js'), 'footer');

        $this->core->addCSS(url([ 'permintaan_perbaikan_inventaris', 'css']));
        $this->core->addJS(url([ 'permintaan_perbaikan_inventaris', 'javascript']), 'footer');
    }

}
