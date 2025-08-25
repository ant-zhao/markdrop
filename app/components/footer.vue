<template>
	<div class="footer b-sizing">
		<div class="footer-content container">footer</div>
	</div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
	.footer {
		background: #ffffff;
		width: 100%;
		padding: 80px 0 24px;
		height: 400px;
		overflow: hidden;
		&-content {
			a {
				color: #373839;
				&:hover {
					color: var(--activeColor);
				}
			}
			h4 {
				font-size: 18px;
				font-weight: 600;
				color: #060606;
				line-height: 25px;
			}
			.left {
				&-top {
					// h2 {
					// 	width: 185px;
					// 	height: 67px;
					// 	background: url('~@/assets/imgs/logo.png') no-repeat center/100%
					// 		100%;
					// }
					.more {
						padding-left: 140px;
						p {
							font-size: 14px;
							color: #373839;
							line-height: 20px;
							margin-top: 20px;
						}
					}
				}
				&-bottom {
					padding-top: 42px;
					font-size: 12px;
					color: #373839;
					line-height: 14px;
				}
			}
			.middle {
				p {
					font-size: 14px;
					color: #373839;
					line-height: 20px;
					margin-top: 20px;
				}
			}
			.right {
				.info {
					padding-top: 20px;
					p {
						font-size: 14px;
						color: #373839;
						line-height: 20px;
					}
				}
				.bottom {
					padding-top: 22px;
					font-size: 12px;
					color: #373839;
					line-height: 14px;
				}
			}
		}
		.friends {
			margin-top: 8px;
			font-size: 12px;
			line-height: 18px;
			a {
				margin-right: 10px;
			}
		}
	}
</style>
