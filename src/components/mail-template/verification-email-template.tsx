interface VerificationEmailTemplateProps {
	href: string
}

const VerificationEmailTemplate = ({
	href
}: VerificationEmailTemplateProps) => {
	return (
		<div
			style={{
				width: '480px',
				fontFamily: 'sans-serif',
				height: 'fit-content',
				padding: '1rem',
				borderRadius: '10px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#fff',
				background:
					'linear-gradient(to left top, hsl(263.4 70% 50.4%), hsl(215 27.9% 16.9%))',
				boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
			}}
		>
			<h1
				style={{
					letterSpacing: '0.05em',
					lineHeight: '2.5rem',
					fontSize: '2.25rem',
					fontWeight: 'bold'
				}}
			>
				Cypress
			</h1>
			<p
				style={{
					opacity: '50%',
					textAlign: 'center',
					fontSize: '1rem',
					lineHeight: '1.5rem'
				}}
			>
				Cypress is the connected workspace where <br />
				better, faster work happens.
			</p>

			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<p
					style={{
						fontSize: '1.125rem',
						lineHeight: '1.75rem',
						fontWeight: 'bold',
						letterSpacing: '0.05em'
					}}
				>
					Verify your email
				</p>
				<a
					href={href}
					style={{
						border: '1px solid hsl(215 27.9% 16.9%)',
						padding: '1rem',
						borderRadius: '10px',
						background: 'hsl(263.4 70% 50.4%)',
						color: 'white',
						textDecoration: 'none',
						fontWeight: 'bold'
					}}
				>
					Confirmation
				</a>
				<p style={{ opacity: '50%' }}>
					Click &rdquo;Confirmation&rdquo; to verify your email
				</p>
			</div>
		</div>
	)
}

export default VerificationEmailTemplate
