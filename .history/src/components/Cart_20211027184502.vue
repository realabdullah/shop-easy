<template>
  <div class="modal fade abd" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="exampleModalLabel">
            Your Shopping Cart
          </h5>
          <button type="button" @click="closeCart" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-image">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="w-25">
                  <img src="item.image" class="img-fluid img-thumbnail" alt="Sheep">
                </td>
                <td>rge</td>
                <td>$item.price</td>
              </tr>
            </tbody>
          </table> 
          <div class="d-flex justify-content-end">
            <h5>Total: <span class="price text-success">${{ item.price }}</span></h5>
          </div>
        </div>
        <div class="modal-footer border-top-0 d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'cart'
    ],

}
</script>

<style>
.abd {
    z-index: 999;
}

.container {
  padding: 2rem 0rem;
}
.table-image thead td, .table-image thead th {
  border: 0;
  color: #666;
  font-size: 0.8rem;
}
.table-image td, .table-image th {
  vertical-align: middle;
  text-align: center;
}
.table-image td.qty, .table-image th.qty {
  max-width: 2rem;
}
.price {
  margin-left: 1rem;
}
.modal-footer {
  padding-top: 0rem;
}

</style>