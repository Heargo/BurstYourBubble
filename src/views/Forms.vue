<template >
  <div class="content">
    <Form>
      <div>
        <input type="text" placeholder="Nom">
        <input type="text" placeholder="prénom">
        <input type="number" placeholder="Age">
      </div>
      <input type="mail" placeholder="email">
      <input type="password" placeholder="mot de passe" id="pwd">
      <input type="password" placeholder="vérifiez le mot de passe" id="pwdcheck">
      <p>Description ou indication</p>
      <select name="test" id="test">
        <option value="value 1">option 1</option>
        <option value="value 1">option 2</option>
        <option value="value 1">option 3</option>
      </select>
      <input type="submit">
      
    </Form>
  </div>
</template>
<script>
import Form from '@/components/Form.vue'
export default {
  name:"Forms",
  components:{
    Form
  }
  
}
</script>
<style lang="scss">
  .content{
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
</style>