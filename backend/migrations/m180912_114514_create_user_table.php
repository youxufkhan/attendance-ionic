<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m180912_114514_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('users', [
            'id' => $this->primaryKey(),
            'username'=> $this->string(25)->unique(),
            'password'=> $this->string(192),
            'name'=> $this->string(50),
            'email'=> $this->string(50)->unique(),
            'type'=>$this->integer(),
            'approved'=>$this->boolean(),
            'created_at'=> $this->dateTime(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user');
    }
}
