<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Action Warning</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you certain to delete {{ produce.name }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'produce'
  ],
  setup(props) {
    const deleteProduct = async () => {
      try {
        await supabase
        .from('products')
        .delete()
        .eq('id', props.produce.id)
      }
      catch (error) {
        console.error('error', error)
      }
    }

    return {
      deleteProduct
    }
  }
}
</script>

<style>

</style>