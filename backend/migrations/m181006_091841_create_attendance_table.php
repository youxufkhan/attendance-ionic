<?php

use yii\db\Migration;

/**
 * Handles the creation of table `attendance`.
 */
class m181006_091841_create_attendance_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('attendance', [
            'id' => $this->primaryKey(),
            'user_id' =>$this->integer(),
            'time_in'=>$this->integer(),
            'time_out'=>$this->integer()

        ]);
        $this->addForeignKey('fk_attendance_user_id','attendance','user_id','users','id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('attendance');
    }
}
