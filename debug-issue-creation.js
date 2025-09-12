// Debug script to test issue creation
// Open browser console on http://localhost:5173 and run this:

// 1. Check if user is logged in
console.log('Current user:', localStorage.getItem('user'))
console.log('Auth token:', localStorage.getItem('token'))

// 2. Test issue creation manually
const testCreateIssue = async () => {
  const issueData = {
    title: "Debug Test Issue",
    description: "Testing issue creation from console",
    category: "Infrastructure",
    critical: false
  }

  try {
    const response = await fetch('http://localhost:8080/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(issueData)
    })
    
    const result = await response.json()
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the test
testCreateIssue()
